import { Theme } from '@radix-ui/themes';

export const RadixUIProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Theme appearance="dark">
            {children}
        </Theme>
    );
};
