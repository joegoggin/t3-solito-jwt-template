import { createParam } from "solito";

const { useParam } = createParam<{ isClaim: string }>();

export const useIsClaim = () => {
    const [isClaim] = useParam("isClaim");

    return isClaim;
};
