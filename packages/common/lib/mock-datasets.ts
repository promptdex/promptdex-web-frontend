
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
        id: 'languages',
        name: 'Languages',
        description: 'Comprehensive list of languages supported by AIPRM.',
        type: 'list',
        count: 50,
        updatedAt: '2023-01-19',
        items: [
            "English", "German", "Spanish", "French", "Italian", "Portuguese", "Polish", "Ukrainian", "Somali", "Afrikaans",
            "Azerbaijani", "Indonesian", "Malaysian Malay", "Malay", "Javanese", "Sundanese", "Bosnian", "Catalan", "Czech", "Chichewa",
            "Welsh", "Danish", "Estonian", "English (UK)", "English (US)", "Esperanto", "Basque", "Irish", "Galician", "Croatian",
            "Xhosa", "Zulu", "Icelandic", "Swahili", "Haitian Creole", "Kurdish", "Latin", "Latvian", "Luxembourgish", "Lithuanian",
            "Hungarian", "Malagasy", "Maltese", "Maori", "Dutch", "Norwegian", "Uzbek", "Romanian", "Sesotho", "Albanian",
            "Slovak", "Slovenian", "Finnish", "Swedish", "Tagalog", "Tatar", "Turkish", "Vietnamese", "Yoruba", "Greek",
            "Belarusian", "Bulgarian", "Kyrgyz", "Kazakh", "Macedonian", "Mongolian", "Russian", "Serbian", "Tajik", "Georgian",
            "Armenian", "Yiddish", "Hebrew", "Uyghur", "Urdu", "Arabic", "Pashto", "Persian", "Nepali", "Marathi",
            "Hindi", "Bengali", "Punjabi", "Gujarati", "Oriya", "Tamil", "Telugu", "Kannada", "Malayalam", "Sinhala",
            "Thai", "Lao", "Burmese", "Khmer", "Korean", "Chinese", "Traditional Chinese", "Japanese"
        ]
    },
    {
        id: 'topics',
        name: 'Topics',
        description: 'Common topics for categorization.',
        type: 'list',
        count: 11,
        updatedAt: '2023-01-23',
        items: [
            "Copywriting", "DevOps", "Marketing", "SaaS", "SEO", "Operating Systems", "Software Applications", "Software Engineering",
            "UNSURE", "Productivity", "Generative AI"
        ]
    },
    {
        id: 'activities',
        name: 'Activities',
        description: 'Various activities related to specific topics.',
        type: 'list',
        count: 40,
        updatedAt: '2023-01-24',
        items: [
            "Accounting", "Spreadsheets", "CRM", "Design", "Improve", "Keywords", "Call to Action", "Games", "Outreach",
            "Persuade", "Positioning", "Product Description", "Products", "Research", "Script Writing", "Sports Writing", "Subject Lines",
            "Summarize", "Marketing", "Writing", "Database Administration", "Configuration Management", "Containerization", "Partnerships",
            "Segment your audience", "Places (Media Channels)", "Startup Ideas", "Unmet Category-Related Needs", "Web Development", "Social Media",
            "Operating System Management", "Plan", "Respond", "Ideation", "Link Building", "Trial", "Cancel", "Pricing", "Refunds", "Quota",
            "Backend Development", "Text Editor", "Version Control", "Midjourney", "Stable Diffusion", "Dall-E", "Sora", "Ideogram AI",
            "Flux.1", "Leonardo AI", "Dream Studio", "Audio Craft", "Kaiber AI", "Adobe Firefly", "Veo", "4o Image Generation"
        ]
    },
    {
        id: 'tones',
        name: 'Tones',
        description: 'Emotional and stylistic tones for content generation.',
        type: 'list',
        count: 20,
        updatedAt: '2023-02-16',
        items: [
            "Authoritative", "Clinical", "Cold", "Confident", "Cynical", "Emotional", "Empathetic", "Formal", "Friendly", "Humorous",
            "Informal", "Ironic", "Optimistic", "Pessimistic", "Playful", "Sarcastic", "Serious", "Sympathetic", "Tentative", "Warm"
        ]
    },
    {
        id: 'writing-styles',
        name: 'Writing Styles',
        description: 'Distinct styles of writing.',
        type: 'list',
        count: 19,
        updatedAt: '2023-02-16',
        items: [
            "Academic", "Analytical", "Argumentative", "Conversational", "Creative", "Critical", "Descriptive", "Epigrammatic",
            "Epistolary", "Expository", "Informative", "Instructive", "Journalistic", "Metaphorical", "Narrative", "Persuasive",
            "Poetic", "Satirical", "Technical"
        ]
    },
    {
        id: 'continue-actions',
        name: 'Continue Actions',
        description: 'Actions to refine or continue the conversation.',
        type: 'list',
        count: 6,
        updatedAt: '2023-02-16',
        items: ["Clarify", "Exemplify", "Expand", "Explain", "Rewrite", "Shorten"]
    },
    {
        id: 'models',
        name: 'Models',
        description: 'AI Models supported or referenced.',
        type: 'list',
        count: 35,
        updatedAt: '2024-07-10',
        items: [
            "GPT-3.5-turbo", "GPT-4", "GPT-4o", "GPT-4o mini", "GPT-4 Turbo", "Claude Sonnet 3.5", "Claude Opus 3", "Claude Haiku 3",
            "o1-preview", "o1-mini", "o1", "o1 pro", "o3-mini", "o3", "GPT-5", "ChatGPT Classic", "DallE3"
        ]
    },
    {
        id: 'prompt-roles',
        name: 'Prompt Roles',
        description: 'Professional roles for Persona adoption in prompts.',
        type: 'list',
        count: 10,
        updatedAt: '2023-08-11',
        items: [
            "content marketer", "data analyst", "programmer", "researcher", "scriptwriter", "SEO specialist", "social media manager",
            "translator", "web developer", "writer"
        ]
    },
    {
        id: 'prompt-tasks',
        name: 'Prompt Tasks',
        description: 'Specific tasks to be performed by the AI.',
        type: 'list',
        count: 10,
        updatedAt: '2023-08-11',
        items: [
            "analyze website content and provide SEO recommendations",
            "conduct sentiment analysis on customer reviews",
            "create a content calendar for social media platforms",
            "create high-converting ad copy for Facebook",
            "develop a customized website",
            "generate catchy titles, meta descriptions, and tags for YouTube videos",
            "generate keywords for SEO optimization",
            "rewrite articles to be 100% unique and human-like",
            "translate text from one language to another",
            "write a unique, SEO optimized article"
        ]
    },
    {
        id: 'prompt-constraints',
        name: 'Prompt Constraints',
        description: 'Constraints to guide the AI output.',
        type: 'list',
        count: 10,
        updatedAt: '2023-08-11',
        items: [
            "adhere to ethical guidelines and avoid misleading information",
            "adhere to SEO best practices and guidelines",
            "base analyses on provided datasets",
            "content must be 100% unique and pass plagiarism checks",
            "ensure clarity and coherence in generated content",
            "ensure outputs are in accessible and user-friendly formats",
            "follow brand guidelines and tone of voice",
            "generate content based on established knowledge up to the last training cut-off",
            "provide accurate and reliable information in research tasks",
            "provide outputs in specified formats"
        ]
    },
    {
        id: 'prompt-contexts',
        name: 'Prompt Contexts',
        description: 'Contextual backgrounds for prompts.',
        type: 'list',
        count: 10,
        updatedAt: '2023-08-11',
        items: [
            "academic research and writing",
            "content marketing and SEO strategy",
            "data analysis and insights for business decision-making",
            "e-commerce product descriptions",
            "fiction and creative writing projects",
            "market research and competitive analysis",
            "multilingual translation and localization",
            "personal branding and professional development",
            "social media advertising campaigns",
            "website development and optimization"
        ]
    },
    // Restored Original Datasets
    {
        id: 'prog-langs-basic',
        name: 'Programming Languages (Basic)',
        description: 'List of popular programming languages for code generation templates.',
        type: 'list',
        count: 10,
        updatedAt: '2 days ago',
        items: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'Java', 'C++', 'Swift', 'Kotlin', 'PHP']
    },
    {
        id: 'tones-basic',
        name: 'Tone of Voice (Basic)',
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
