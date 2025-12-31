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
            label: { default: 'variable' },
            value: { default: '' },
            type: { default: 'text' },
            options: { default: [] },
            datasetId: { default: undefined },
            min: { default: 0 },
            max: { default: 100 },
            step: { default: 1 },
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
