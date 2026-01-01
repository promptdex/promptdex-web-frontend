import { mergeAttributes, Node, nodeInputRule, nodePasteRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { VariableNodeView } from './variable-node-view';
import { parseVariableContent, serializeVariable, VariableAttributes } from './lib';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        variable: {
            setVariable: (label: string) => ReturnType;
        };
    }
}

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
                parseHTML: element => element.getAttribute('data-label'),
                renderHTML: attributes => ({ 'data-label': attributes.label }),
            },
            value: {
                default: '',
                parseHTML: element => element.getAttribute('data-value'),
                renderHTML: attributes => ({ 'data-value': attributes.value }),
            },
            type: {
                default: 'text',
                parseHTML: element => element.getAttribute('data-var-type'),
                renderHTML: attributes => ({ 'data-var-type': attributes.type }),
            },
            options: {
                default: [],
                parseHTML: element => {
                    const val = element.getAttribute('data-options');
                    return val ? JSON.parse(val) : [];
                },
                renderHTML: attributes => ({ 'data-options': JSON.stringify(attributes.options) }),
            },
            datasetId: {
                default: undefined,
                parseHTML: element => element.getAttribute('data-dataset-id'),
                renderHTML: attributes => attributes.datasetId ? { 'data-dataset-id': attributes.datasetId } : {},
            },
            min: {
                default: 0,
                parseHTML: element => parseInt(element.getAttribute('data-min') || '0'),
                renderHTML: attributes => ({ 'data-min': attributes.min }),
            },
            max: {
                default: 100,
                parseHTML: element => parseInt(element.getAttribute('data-max') || '100'),
                renderHTML: attributes => ({ 'data-max': attributes.max }),
            },
            step: {
                default: 1,
                parseHTML: element => parseInt(element.getAttribute('data-step') || '1'),
                renderHTML: attributes => ({ 'data-step': attributes.step }),
            },
        };
    },

    parseHTML() {
        return [{ tag: 'span[data-type="variable"]' }];
    },

    renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
        return ['span', mergeAttributes(HTMLAttributes, { 'data-type': 'variable' })];
    },

    renderText({ node }) {
        return serializeVariable(node.attrs as VariableAttributes);
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
                getAttributes: match => parseVariableContent(match[1]),
            }),
        ];
    },

    addPasteRules() {
        return [
            nodePasteRule({
                find: /\[(.*?)\]/g,
                type: this.type,
                getAttributes: match => parseVariableContent(match[1]),
            }),
        ];
    },
});
