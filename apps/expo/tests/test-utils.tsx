import { render, RenderOptions } from "@testing-library/react-native";
import { Provider } from "app/provider";
import { ReactElement } from "react";

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Provider, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
