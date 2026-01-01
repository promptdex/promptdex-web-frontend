import { ChatInput } from '../../chat-view/chat-input/input';

export const ChatLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden bg-background">
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
            <div className="absolute bottom-6 left-0 right-0 z-50 pointer-events-none">
                <div className="mx-auto w-full pointer-events-auto">
                    <ChatInput showGreeting={false} forceBottomMode={true} />
                </div>
            </div>
        </div>
    );
};
