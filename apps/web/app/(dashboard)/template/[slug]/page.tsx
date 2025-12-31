import { TemplateView } from '@repo/common/components';

export default function TemplateViewPage({ params }: { params: { slug: string } }) {
    return <TemplateView id={params.slug} />;
}
