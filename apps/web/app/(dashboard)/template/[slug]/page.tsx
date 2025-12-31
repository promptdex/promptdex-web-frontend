import { TemplateView } from '@repo/common/components';

export default async function TemplateViewPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <TemplateView id={slug} />;
}
