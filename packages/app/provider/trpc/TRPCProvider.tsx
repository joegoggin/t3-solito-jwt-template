import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { Platform } from "react-native";
import React, { useState, ReactNode } from "react";
import * as devalue from "devalue";

import { API } from "app/env";
import { api } from "app/utils/trpc";

let authToken: string;

/*
    params: (token: string)
    return type: void
    description: A setting function for "authToken".
*/
export const setAuthToken = (token: string) => {
    authToken = `Bearer ${token}`;
};

/*
    props: (children: ReactNode)
    description: A Context Provider for using tRPC.
*/
export const TRPCProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const batchOpts = {
        url: API,
        headers: () => {
            return {
                Authorization: authToken,
            };
        },
    };

    let links =
        Platform.OS === "web"
            ? [loggerLink(), httpBatchLink(batchOpts)]
            : [httpBatchLink(batchOpts)];

    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        api.createClient({
            links,
            transformer: {
                serialize: (object) => devalue.uneval(object),
                deserialize: (object) => eval(`(${object})`),
            },
        })
    );

    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </api.Provider>
    );
};
