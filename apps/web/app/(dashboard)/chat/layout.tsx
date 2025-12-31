import { ChatInput } from '@repo/common/components';

export default function ChatPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden bg-background">
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
            <div className="absolute bottom-6 left-0 right-0 z-50 pointer-events-none">
                <div className="mx-auto w-full max-w-4xl px-4 pointer-events-auto">
                    <ChatInput />
                </div>
            </div>
        </div>
    );
}
