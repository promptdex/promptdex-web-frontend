import {
    IconBriefcase,
    IconCode,
    IconMail,
    IconPalette,
    IconWriting,
} from '@tabler/icons-react';

export type Template = {
    id: string;
    title: string;
    description: string;
    content: string;
};

export type Category = {
    id: string;
    name: string;
    icon: React.ElementType;
    templates: Template[];
    color: string;
};

export const MOCK_CATEGORIES: Category[] = [
    {
        id: 'writing',
        name: 'Writing',
        icon: IconWriting,
        color: 'text-blue-500',
        templates: [
            {
                id: 'blog-post',
                title: 'Blog Post',
                description: 'Write a comprehensive blog post about a specific topic.',
                content:
                    'Write a comprehensive blog post about [Topic]. Include an engaging introduction, several main points with subheadings, and a conclusion. Tone should be [Tone].',
            },
            {
                id: 'essay',
                title: 'Essay',
                description: 'Draft an academic essay with clear arguments.',
                content:
                    'Write an essay on [Subject]. The essay should argue that [Thesis]. Include evidence to support your claims and address potential counterarguments.',
            },
            {
                id: 'creative-story',
                title: 'Creative Story',
                description: 'Spin a creative yarn based on a prompt.',
                content:
                    'Write a short story about [Premise]. The story should focus on the theme of [Theme] and feature a character who [Character Trait].',
            },
        ],
    },
    {
        id: 'coding',
        name: 'Coding',
        icon: IconCode,
        color: 'text-green-500',
        templates: [
            {
                id: 'refactor-code',
                title: 'Refactor Code',
                description: 'Improve the structure and efficiency of code.',
                content:
                    'Refactor the following code to be more efficient, readable, and follow best practices:\n\n[Insert Code Here]',
            },
            {
                id: 'explain-code',
                title: 'Explain Code',
                description: 'Get a clear explanation of complex code snippets.',
                content:
                    'Explain how the following code works step-by-step. Identify any potential bugs or edge cases:\n\n[Insert Code Here]',
            },
            {
                id: 'generate-unit-tests',
                title: 'Generate Unit Tests',
                description: 'Create test cases for your functions.',
                content:
                    'Write comprehensive unit tests for the following function using [Testing Framework]. Cover happy paths and error cases:\n\n[Insert Code Here]',
            },
        ],
    },
    {
        id: 'business',
        name: 'Business',
        icon: IconBriefcase,
        color: 'text-purple-500',
        templates: [
            {
                id: 'business-plan',
                title: 'Business Plan',
                description: 'Outline a plan for a new business venture.',
                content:
                    'Create a lean business plan for a startup that does [Business Idea]. Include value proposition, target market, revenue streams, and key resources.',
            },
            {
                id: 'meeting-agenda',
                title: 'Meeting Agenda',
                description: 'Structure a productive meeting.',
                content:
                    'Create an agenda for a [Meeting Type] meeting about [Topic]. The goal of the meeting is to [Goal]. Attendees limit: [Number].',
            },
            {
                id: 'swot-analysis',
                title: 'SWOT Analysis',
                description: 'Analyze strengths, weaknesses, opportunities, threats.',
                content:
                    'Perform a SWOT analysis for [Company/Product]. Focus on the current market trends in [Industry].',
            },
        ],
    },
    {
        id: 'marketing',
        name: 'Marketing',
        icon: IconPalette,
        color: 'text-pink-500',
        templates: [
            {
                id: 'social-media-post',
                title: 'Social Media Post',
                description: 'Draft engaging posts for social platforms.',
                content:
                    'Write a series of 3 social media posts for [Platform] about [Topic]. Use emojis and hashtags appropriate for the audience.',
            },
            {
                id: 'email-campaign',
                title: 'Email Campaign',
                description: 'Write a persuasive email sequence.',
                content:
                    'Write a promotional email for [Product/Service]. The subject line should be catchy. The body should address the customer\'s pain point: [Pain Point].',
            },
        ],
    },
    {
        id: 'email',
        name: 'Email',
        icon: IconMail,
        color: 'text-yellow-500',
        templates: [
            {
                id: 'professional-follow-up',
                title: 'Professional Follow-up',
                description: 'Follow up nicely after a meeting or application.',
                content:
                    'Write a polite customized follow-up email to [Name] regarding [Context]. Keep it professional and concise.',
            },
            {
                id: 'cold-outreach',
                title: 'Cold Outreach',
                description: 'Reach out to potential new clients.',
                content:
                    'Write a cold email to a potential client offering [Service]. Focus on how we can help them solve [Problem].',
            },
        ],
    },
];

export const getTemplateById = (templateId: string): Template | undefined => {
    for (const category of MOCK_CATEGORIES) {
        const template = category.templates.find(t => t.id === templateId);
        if (template) return template;
    }
    return undefined;
};
