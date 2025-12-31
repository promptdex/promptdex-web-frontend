import { DatasetView } from '@repo/common/components';

export default async function DatasetSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <DatasetView slug={slug} />;
}
