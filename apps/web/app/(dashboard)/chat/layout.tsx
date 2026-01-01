import { ChatLayout } from '@repo/common/components';

export default function ChatPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ChatLayout>{children}</ChatLayout>;
}
