import { mergeAttributes, Node, nodeInputRule, nodePasteRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { VariableNodeView } from './variable-node-view';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        variable: {
            setVariable: (label: string) => ReturnType;
        };
    }
}

// Regex to match [Topic] or [Any Label]
export const variableRegex = /\[(.*?)\]/g;

export const VariableExtension = Node.create({
    name: 'variable',

    group: 'inline',

    inline: true,

    selectable: false,

    atom: true,

    addAttributes() {
        return {
            label: {
                default: 'variable',
            },
            value: {
                default: '',
            },
            type: {
                default: 'text', // text, textarea, select
            },
            options: {
                default: [], // for select
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'span[data-type="variable"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
        return ['span', mergeAttributes(HTMLAttributes, { 'data-type': 'variable' })];
    },

    renderText({ node }) {
        if (node.attrs.value) return node.attrs.value;
        const typeSuffix = node.attrs.type !== 'text' ? `:${node.attrs.type}` : '';
        // Serialization doesn't support options well in this simple format, but simple type is fine.
        return `[${node.attrs.label}${typeSuffix}]`;
    },

    addNodeView() {
        return ReactNodeViewRenderer(VariableNodeView);
    },

    addCommands() {
        return {
            setVariable:
                (label: string) =>
                ({ commands }: { commands: any }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: { label },
                    });
                },
        };
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: /\[(.*?)\]$/,
                type: this.type,
                getAttributes: match => {
                    // Match content inside brackets: "Label" or "Label:type" or "Label:type:opt1,opt2"
                    const content = match[1];
                    const parts = content.split(':');
                    const label = parts[0];
                    const type = parts[1] || 'text';
                    const options = parts[2] ? parts[2].split(',') : [];

                    return { label, type, options };
                },
            }),
        ];
    },

    addPasteRules() {
        return [
            nodePasteRule({
                find: /\[(.*?)\]/g,
                type: this.type,
                getAttributes: match => {
                    const content = match[1];
                    const parts = content.split(':');
                    const label = parts[0];
                    const type = parts[1] || 'text';
                    const options = parts[2] ? parts[2].split(',') : [];
                    
                    return { label, type, options };
                },
            }),
        ];
    },
});
