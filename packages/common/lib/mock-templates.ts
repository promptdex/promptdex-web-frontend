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
                    'Write a comprehensive blog post about [Topic].\n\nTarget Audience: [Audience:select:General Public,Professionals,Students,Create Custom]\nTone: [Tone:select:Professional,Casual,Humorous,Didactic]\nWord Count: [Length:select:Short (~500 words),Medium (~1000 words),Long (+2000 words)]\n\nKey Points to Cover:\n[Key Points:textarea]\n\nCall to Action:\n[CTA:textarea]',
            },
            {
                id: 'essay',
                title: 'Essay',
                description: 'Draft an academic essay with clear arguments.',
                content:
                    'Write an academic essay on [Subject].\n\nThesis Statement:\n[Thesis]\n\nAcademic Level: [Level:select:High School,Undergraduate,Graduate,PhD]\nCitation Style: [Citation:select:APA,MLA,Chicago,Harvard]\n\nArguments to Include:\n[Arguments:textarea]',
            },
            {
                id: 'creative-story',
                title: 'Creative Story',
                description: 'Spin a creative yarn based on a prompt.',
                content:
                    'Write a short story about [Premise].\n\nGenre: [Genre:select:Sci-Fi,Fantasy,Mystery,Romance,Horror]\nCharacter Archetype: [Character:select:The Hero,The Rebel,The Explorer,The Innocent]\nSetting:\n[Setting Details:textarea]\n\nPlot Twist (optional):\n[Plot Twist:textarea]',
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
                    'Refactor the following code.\n\nPrimary Goal: [Goal:select:Improve Performance,Enhance Readability,Fix Bugs,Modernize Syntax]\nLanguage: [Language:select:TypeScript,JavaScript,Python,Rust,Go,C++]\n\nCode to Refactor:\n[Code:textarea]',
            },
            {
                id: 'explain-code',
                title: 'Explain Code',
                description: 'Get a clear explanation of complex code snippets.',
                content:
                    'Explain the following code snippet.\n\nAudience Level: [Expertise:select:Beginner,Intermediate,Expert]\nGoal: [Goal:select:General Overview,Line-by-line Walkthrough,Security Analysis]\n\nCode:\n[Code:textarea]',
            },
            {
                id: 'generate-unit-tests',
                title: 'Generate Unit Tests',
                description: 'Create test cases for your functions.',
                content:
                    'Write unit tests for the following function.\n\nTesting Framework: [Framework:select:Jest,Vitest,Mocha,PyTest,RSpec]\nCoverage Requirements: [Coverage:select:Happy Path Only,Edge Cases,Full Coverage]\n\nCode to Test:\n[Code:textarea]',
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
                    'Create a lean business plan for a startup that does [Business Idea:textarea].\n\nTarget Market: [Market:select:B2B,B2C,Enterprise,Niche]\nMonetization Model: [Model:select:Subscription,One-time Purchase,Freemium,Ad-supported]\nInitial Budget: [Budget:select:Bootstrapped,Seed (<$50k),Series A (>$1M)]\n\nKey Competitors:\n[Competitors:tags]',
            },
            {
                id: 'meeting-agenda',
                title: 'Meeting Agenda',
                description: 'Structure a productive meeting.',
                content:
                    'Create an agenda for a meeting about [Topic].\n\nMeeting Type: [Type:select:Daily Standup,Weekly Sync,Quarterly Planning,Brainstorming,Post-Mortem]\nAttendees: [Attendees:tags]\n\nKey Objectives:\n[Objectives:textarea]',
            },
            {
                id: 'swot-analysis',
                title: 'SWOT Analysis',
                description: 'Analyze strengths, weaknesses, opportunities, threats.',
                content:
                    'Perform a SWOT analysis for [Company/Product].\n\nIndustry: [Industry]\nCompetitors:\n[Competitors:tags]\nfocus Area: [Focus:select:General,Marketing,Operational,Financial]',
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
                    'Write a social media post about [Topic].\n\nPlatform: [Platform:select:Twitter/X,LinkedIn,Instagram,TikTok,Facebook]\nHashtags to Include:\n[Hashtags:tags]\nVibe: [Vibe:select:Viral/Trendy,Professional/Thought Leadership,Helpful/Educational,Promotional]\n\nCall to Action:\n[CTA:textarea]',
            },
            {
                id: 'email-campaign',
                title: 'Marketing Email',
                description: 'Write a persuasive email sequence.',
                content:
                    'Write a promotional email for [Product/Service].\n\nGoal: [Goal:select:Drive Sales,Welcome New User,Re-engagement,Newsletter]\nOffer/Discount: [Offer]\n\nKey Value Proposition:\n[Value Prop:textarea]',
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
                    'Write a follow-up email to [Name].\n\nContext: [Context:select:After Job Interview,After Sales Meeting,After Networking Event,Check-in]\nTime since last contact: [Time:select:24 hours,1 week,1 month]\n\nSpecific points to recall:\n[Points:textarea]',
            },
            {
                id: 'cold-outreach',
                title: 'Cold Outreach',
                description: 'Reach out to potential new clients.',
                content:
                    'Write a cold email to a potential client at [Company Name].\n\nSelling: [Service/Product]\nPain Point Addressing: [Pain Point]\nValue Proposition: [Value:textarea]\n\nDesired Outcome: [Outcome:select:Book a Call,Request a Demo,Reply to Email]',
            },
        ],
    },
    {
        id: 'showcase',
        name: 'Showcase',
        icon: IconCode,
        color: 'text-orange-500',
        templates: [
            {
                id: 'all-variables',
                title: 'All Variables Demo',
                description: 'A template demonstrating all available variable types.',
                content:
                    '# Variable Showcase\n\n' +
                    '## Basic Inputs\n' +
                    'Text: [Text Variable:text]\n' +
                    'Textarea: [Textarea Variable:textarea]\n' +
                    'Tags: [Tags Variable:tags]\n\n' +
                    '## Selection\n' +
                    'Select: [Select Variable:select:Option A,Option B,Option C]\n' +
                    'Dropdown: [Dropdown Variable:dropdown:First,Second,Third]\n' +
                    'Radio: [Radio Variable:radio:Yes,No,Maybe]\n' +
                    'Multiselect: [Multiselect Variable:multiselect:Apple,Banana,Cherry,Date]\n\n' +
                    '## Datasets\n' +
                    'Dataset (Languages): [Language:dataset:languages]\n' +
                    'Combobox (Topics): [Topic:combobox:topics]\n\n' +
                    '## Numeric\n' +
                    'Number: [Number Variable:number:0,100,1]\n' +
                    'Range: [Range Variable:range:0,100,5]\n' +
                    'Percentage: [Percentage Variable:percentage]\n' +
                    'Rating: [Rating Variable:rating:5]\n\n' +
                    '## Date & Time\n' +
                    'Date: [Date Variable:date]\n' +
                    'Date Range: [Date Range Variable:date-range]\n' +
                    'Time: [Time Variable:time]\n' +
                    'Datetime: [Datetime Variable:datetime]\n\n' +
                    '## Validation\n' +
                    'Email: [Email Variable:email]\n' +
                    'URL: [URL Variable:url]\n' +
                    'Phone: [Phone Variable:phone]\n\n' +
                    '## Visual & Rich\n' +
                    'Color: [Color Variable:color]\n' +
                    'Emoji: [Emoji Variable:emoji]\n' +
                    'Checkbox: [Checkbox Variable:checkbox]\n' +
                    'Code:\n[Code Variable:code]'
            },
            {
                id: 'advanced-logic',
                title: 'Advanced Filtering',
                description: 'Demonstrating dataset filtering capabilities.',
                content:
                    'Select a programming language from the standard list:\n' +
                    '[Language:dataset:languages]\n\n' +
                    'Now select a related topic (try searching or filtering):\n' +
                    '[Topic:combobox:topics]'
            }
        ]
    },
];

export const getTemplateById = (templateId: string): Template | undefined => {
    for (const category of MOCK_CATEGORIES) {
        const template = category.templates.find(t => t.id === templateId);
        if (template) return template;
    }
    return undefined;
};
