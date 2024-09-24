import { RadixUIProvider } from "./radix-ui/provider";
import { ReownProvider } from "./reown/provider";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <RadixUIProvider>
                <ReownProvider>{children}</ReownProvider>
            </RadixUIProvider>
        </>
    );
};
