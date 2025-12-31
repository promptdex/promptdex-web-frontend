'use client';

import { TemplateListing } from "@repo/common/components";

export default function TemplatesPage() {
    return (
        <div className="flex h-full w-full flex-col items-center overflow-y-auto p-8">
            <TemplateListing />
        </div>
    );
}
