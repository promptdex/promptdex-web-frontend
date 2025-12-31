import { DatasetView } from '@repo/common/components';

export default function DatasetSlugPage({ params }: { params: { slug: string } }) {
    return <DatasetView slug={params.slug} />;
}
