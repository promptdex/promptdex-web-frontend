import { marked } from 'marked';
import type { Template } from './mock-templates';
import { VariableType } from '../components/chat-view/chat-input/lib/variable-types';

/**
 * Pre-process template content to convert variables [Label:type:options] 
 * into HTML spans that existing VariableExtension can parse.
 * 
 * Note: VariableExtension must be configured to parse data- attributes.
 */
const preProcessVariablesToHtml = (content: string): string => {
    return content.replace(/\[(.*?)\]/g, (match, captured) => {
        const parts = captured.split(':');
        const label = parts[0] || 'variable';
        const type = (parts[1] as VariableType) || 'text';
        const thirdPart = parts[2] || '';
        
        const attrs: Record<string, string> = {
            'data-type': 'variable',
            'data-label': label,
            'data-var-type': type, // 'type' might be reserved or confusing, check extension mapping
        };

        // Map type-specific attributes
        if (type === 'dataset' || type === 'combobox') {
            attrs['data-dataset-id'] = thirdPart;
        } else if (type === 'number' || type === 'range') {
            const [min, max, step] = thirdPart.split(',').map(Number);
            attrs['data-min'] = (min || 0).toString();
            attrs['data-max'] = (max || 100).toString();
            attrs['data-step'] = (step || 1).toString();
        } else if (type === 'rating') {
            attrs['data-max'] = (parseInt(thirdPart) || 5).toString();
        } else {
            // Options
            if (thirdPart) {
                // If it's a comma-separated list, we might want to store it as JSON or string?
                // VariableAttributes expects string[]
                // In HTML attributes, usually best to JSON stringify arrays
                 attrs['data-options'] = JSON.stringify(thirdPart.split(','));
            }
        }

        // Build span string
        const attrString = Object.entries(attrs)
            .map(([key, val]) => `${key}="${val.replace(/"/g, '&quot;')}"`)
            .join(' ');
            
        return `<span ${attrString}></span>`;
    });
};

/**
 * Insert a template into a Tiptap editor using Markdown parsing
 */
export const insertTemplateIntoEditor = (editor: any, template: Template) => {
    if (!editor) return;

    const content = template.content || '';
    
    // 1. Convert [Variable] -> <span ...>
    const contentWithVariables = preProcessVariablesToHtml(content);
    
    // 2. Parse Markdown -> HTML (preserving the <span...>)
    // marked usually preserves HTML
    const html = marked.parse(contentWithVariables, { async: false }) as string;

    console.log('[Template Parser] Input:', content);
    console.log('[Template Parser] With Variables:', contentWithVariables);
    console.log('[Template Parser] HTML Output:', html);

    editor.commands.clearContent();
    editor.commands.setContent(html);
    editor.commands.focus();
};

/**
 * Get a greeting based on time of day
 */
export const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
};

