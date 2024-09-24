import { headers } from 'next/headers';
import { ContextProvider } from './context';

export const ReownProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const cookies = headers().get('cookie');

    return (
        <ContextProvider cookies={cookies}>
            {children}
        </ContextProvider>
    );
};
