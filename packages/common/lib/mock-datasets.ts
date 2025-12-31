
export interface Dataset {
    id: string;
    name: string;
    description: string;
    type: 'list' | 'key-value' | 'text';
    count: number;
    updatedAt: string;
    items?: string[]; // For simple lists
}

export const MOCK_DATASETS: Dataset[] = [
    {
        id: 'prog-langs',
        name: 'Programming Languages',
        description: 'List of popular programming languages for code generation templates.',
        type: 'list',
        count: 20,
        updatedAt: '2 days ago',
        items: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'Java', 'C++', 'Swift', 'Kotlin', 'PHP']
    },
    {
        id: 'tones',
        name: 'Tone of Voice',
        description: 'Different tones for modifying response style.',
        type: 'list',
        count: 8,
        updatedAt: '1 week ago',
        items: ['Professional', 'Casual', 'Academic', 'Humorous', 'Concise', 'Detailed', 'Empathetic', 'Sarcastic']
    },
    {
        id: 'output-formats',
        name: 'Output Formats',
        description: 'Standardized output formats for data extraction tasks.',
        type: 'list',
        count: 5,
        updatedAt: '1 month ago',
        items: ['JSON', 'CSV', 'Markdown Table', 'XML', 'YAML']
    },
    {
        id: 'cloud-providers',
        name: 'Cloud Providers',
        description: 'List of major cloud service providers.',
        type: 'list',
        count: 4,
        updatedAt: '3 weeks ago',
        items: ['AWS', 'Google Cloud', 'Azure', 'DigitalOcean']
    }
];

export const DATASET_CATEGORIES = ['All', 'Development', 'Writing', 'Data', 'Business'];
