'use client';
import { DisableEnter, ShiftEnterToLineBreak } from '@repo/shared/utils';
import CharacterCount from '@tiptap/extension-character-count';
import { Document } from '@tiptap/extension-document';
import { HardBreak } from '@tiptap/extension-hard-break';
import { Highlight } from '@tiptap/extension-highlight';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Text } from '@tiptap/extension-text';

import { Editor, useEditor } from '@tiptap/react';
import { useEffect, useState } from 'react';
import { useChatStore } from '../store';
import { VariableExtension } from '../components/chat-input/variable-extension';

export const useChatEditor = (editorProps: {
    placeholder?: string;
    defaultContent?: string;
    charLimit?: number;
    enableEnter?: boolean;
    onInit?: (props: { editor: Editor }) => void;
    onUpdate?: (props: { editor: Editor }) => void;
}) => {
    const setEditor = useChatStore(state => state.setEditor);
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Placeholder.configure({
                placeholder: editorProps?.placeholder || 'Ask anything',
            }),
            CharacterCount.configure({
                limit: editorProps?.charLimit || 400000,
            }),
            ...(!editorProps?.enableEnter ? [ShiftEnterToLineBreak, DisableEnter] : []),
            Highlight.configure({
                HTMLAttributes: {
                    class: 'prompt-highlight',
                },
            }),
            VariableExtension,
            HardBreak,
        ],
        immediatelyRender: false,
        content: '',
        autofocus: true,

        onTransaction(props) {
            const { editor } = props;
            const text = editor.getText();
            const html = editor.getHTML();
            if (text === '/') {
                // setOpenPromptsBotCombo(true);
            } else {
                const newHTML = html.replace(/::((?:(?!::).)+)::/g, (_, content) => {
                    return ` <mark class="prompt-highlight">${content}</mark> `;
                });

                if (newHTML !== html) {
                    editor.commands.setContent(newHTML, {
                        emitUpdate: true,
                        preserveWhitespace: true,
                    } as any);
                }

                // setOpenPromptsBotCombo(false);
            }
        },
        onCreate(props) {
            if (editorProps?.defaultContent) {
                const content = editorProps.defaultContent;
                // Parse the initial content for variables
                props.editor.commands.setContent(content, {
                    emitUpdate: true,
                    preserveWhitespace: true,
                } as any);

                // Content with [] might not be caught by inputRules on create.
                // We use a specific command to parse the whole doc if we find variables.
                if (content.includes('[') && content.includes(']')) {
                    const nodesToReplace: { from: number; to: number; label: string; type: string; options: string[] }[] = [];
                    props.editor.state.doc.descendants((node, pos) => {
                        if (node.isText && node.text) {
                            const regex = /\[(.*?)\]/g;
                            let match;
                            while ((match = regex.exec(node.text)) !== null) {
                                const parts = match[1].split(':');
                                const label = parts[0];
                                const type = parts[1] || 'text';
                                const options = parts[2] ? parts[2].split(',') : [];

                                nodesToReplace.push({
                                    from: pos + match.index,
                                    to: pos + match.index + match[0].length,
                                    label,
                                    type,
                                    options,
                                });
                            }
                        }
                    });
                    if (nodesToReplace.length > 0) {
                        let chain = props.editor.chain();
                        nodesToReplace.reverse().forEach(node => {
                            chain = chain.deleteRange({ from: node.from, to: node.to })
                                .insertContentAt(node.from, {
                                    type: 'variable',
                                    attrs: {
                                        label: node.label,
                                        type: node.type,
                                        options: node.options
                                    }
                                });
                        });
                        chain.run();
                    }
                }
            }
            if (editorProps?.onInit) {
                editorProps.onInit({ editor: props.editor });
            }
        },
        onUpdate(props) {
            const { editor } = props;
            if (editorProps?.onUpdate) {
                editorProps.onUpdate({ editor });
            }
        },

        parseOptions: {
            preserveWhitespace: 'full',
        },
    });

    const [isTemplateMode, setIsTemplateMode] = useState(false);
    const [manualUnlock, setManualUnlock] = useState(false);
    const [hasVariables, setHasVariables] = useState(false);

    useEffect(() => {
        setEditor(editor);
    }, [editor]);

    // Check for variables to decide if we are in "template mode"
    useEffect(() => {
        if (!editor) return;
        const checkVariables = () => {
            const json = editor.getJSON();
            const nodesExist = json.content?.some((node: any) =>
                node.type === 'paragraph' && node.content?.some((child: any) => child.type === 'variable')
            );

            const text = editor.getText();
            const textPatternsExist = /\[(.*?)\]/.test(text);

            setHasVariables(!!nodesExist || !!textPatternsExist);

            if (nodesExist) {
                if (!isTemplateMode && !manualUnlock) {
                    setIsTemplateMode(true);
                }
            } else {
                // If only text patterns exist, we don't force template mode loop because we want user to be able to edit them (or toggle manually)
                // If no variables AND no text patterns (implied by cleanup?), then reset.
                // Actually, if I delete all variables, I want to exit template mode.

                // If we have text patterns but NO nodes, we are likely in "Unlocked" mode.
                // We should NOT reset manualUnlock automatically if text patterns exist, otherwise we might flip-flop?
                // No, if nodes don't exist, we just don't force lock.

                if (isTemplateMode) setIsTemplateMode(false);
                // Reset manual unlock only if genuinely empty of ANY variable-like content
                if (!textPatternsExist && manualUnlock) setManualUnlock(false);
            }
        };
        editor.on('update', checkVariables);

        // Initial check on mount
        checkVariables();

        return () => { editor.off('update', checkVariables); };
    }, [editor, isTemplateMode, manualUnlock]);

    // Separate effect for editable state to avoid flushSync during render/update
    useEffect(() => {
        // If we want to allow editing everything when unlocked, we just don't force false.
        // But if template mode is TRUE, we force editable = false (except for inputs)
        if (!editor || editor.isDestroyed) return;

        const raf = requestAnimationFrame(() => {
            if (editor.isEditable === isTemplateMode) {
                editor.setEditable(!isTemplateMode);
            }
        });

        return () => cancelAnimationFrame(raf);
    }, [editor, isTemplateMode]);

    useEffect(() => {
        if (editor) {
            editor.commands.focus('end');
        }
    }, [editor]);

    const toggleTemplateMode = () => {
        if (!editor) return;

        if (isTemplateMode) {
            // Unlocking: Convert variables to text [label:type:options]
            const nodesToReplace: { from: number; to: number; text: string }[] = [];
            editor.state.doc.descendants((node, pos) => {
                if (node.type.name === 'variable') {
                    const { label, type, options } = node.attrs;
                    let text = `[${label}`;
                    if (type !== 'text' || (options && options.length > 0)) {
                        text += `:${type}`;
                    }
                    if (options && options.length > 0) {
                        text += `:${options.join(',')}`;
                    }
                    text += `]`;

                    nodesToReplace.push({
                        from: pos,
                        to: pos + node.nodeSize,
                        text,
                    });
                }
            });

            if (nodesToReplace.length > 0) {
                let chain = editor.chain();
                nodesToReplace.reverse().forEach(node => {
                    chain = chain.deleteRange({ from: node.from, to: node.to })
                        .insertContentAt(node.from, node.text);
                });
                chain.run();
            }

            setManualUnlock(true);
            setIsTemplateMode(false);

        } else {
            // Locking: Convert text [label:type:options] to variables
            const nodesToReplace: { from: number; to: number; label: string; type: string; options: string[] }[] = [];
            editor.state.doc.descendants((node, pos) => {
                if (node.isText && node.text) {
                    const regex = /\[(.*?)\]/g;
                    let match;
                    while ((match = regex.exec(node.text)) !== null) {
                        const parts = match[1].split(':');
                        const label = parts[0];
                        const type = parts[1] || 'text';
                        const options = parts[2] ? parts[2].split(',') : [];

                        nodesToReplace.push({
                            from: pos + match.index,
                            to: pos + match.index + match[0].length,
                            label,
                            type,
                            options,
                        });
                    }
                }
            });

            if (nodesToReplace.length > 0) {
                let chain = editor.chain();
                nodesToReplace.reverse().forEach(node => {
                    chain = chain.deleteRange({ from: node.from, to: node.to })
                        .insertContentAt(node.from, {
                            type: 'variable',
                            attrs: {
                                label: node.label,
                                type: node.type,
                                options: node.options
                            }
                        });
                });
                chain.run();
            }

            setManualUnlock(false);
            setIsTemplateMode(true);
        }
    };

    return {
        editor,
        isTemplateMode,
        setIsTemplateMode,
        setManualUnlock,
        hasVariables,
        toggleTemplateMode,
    };
};
