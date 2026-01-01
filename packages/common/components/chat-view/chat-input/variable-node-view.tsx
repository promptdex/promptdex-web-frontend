import { NodeViewProps } from '@tiptap/react';
import React, { useEffect, useState } from 'react';
import { TextVariable } from './lib/text-variable';
import { TextareaVariable } from './lib/textarea-variable';
import { TagsVariable } from './lib/tags-variable';
import { SelectVariable } from './lib/select-variable';
import { DatasetVariable } from './lib/dataset-variable';
import { NumberVariable } from './lib/number-variable';
import { CheckboxVariable } from './lib/checkbox-variable';
import { RadioVariable } from './lib/radio-variable';
import { RangeVariable } from './lib/range-variable';
import { DateVariable } from './lib/date-variable';
import { ColorVariable } from './lib/color-variable';
import { EmailVariable } from './lib/email-variable';
import { UrlVariable } from './lib/url-variable';
import { PhoneVariable } from './lib/phone-variable';
import { TimeVariable } from './lib/time-variable';
import { DatetimeVariable } from './lib/datetime-variable';
import { RatingVariable } from './lib/rating-variable';
import { EmojiVariable } from './lib/emoji-variable';
import { MultiselectVariable } from './lib/multiselect-variable';
import { CodeVariable } from './lib/code-variable';
import { PercentageVariable } from './lib/percentage-variable';
import { DateRangeVariable } from './lib/date-range-variable';

export const VariableNodeView: React.FC<NodeViewProps> = (props) => {
    const [value, setValue] = useState(props.node.attrs.value || '');
    const type = props.node.attrs.type || 'text';
    const options = props.node.attrs.options || [];
    const label = props.node.attrs.label;
    const datasetId = props.node.attrs.datasetId;
    const min = props.node.attrs.min;
    const max = props.node.attrs.max;
    const step = props.node.attrs.step;

    const [tags, setTags] = useState<string[]>(
        value ? value.split('\n').map((t: string) => t.replace('• ', '')).filter(Boolean) : []
    );
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        setValue(props.node.attrs.value || '');
        if (type === 'tags' && props.node.attrs.value) {
            setTags(props.node.attrs.value.split('\n').map((t: string) => t.replace('• ', '')).filter(Boolean));
        }
    }, [props.node.attrs.value, type]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }) => {
        const newValue = e.target.value;
        setValue(newValue);
        props.updateAttributes({ value: newValue });
    };

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        props.updateAttributes({ value: newValue });
    };

    const handleCheckboxChange = (checked: boolean) => {
        const newValue = checked ? 'true' : 'false';
        setValue(newValue);
        props.updateAttributes({ value: newValue });
    };

    const handleTagsChange = (newTags: string[]) => {
        setTags(newTags);
        const formatted = newTags.map(t => `• ${t}`).join('\n');
        setValue(formatted);
        props.updateAttributes({ value: formatted });
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
            e.preventDefault();
            const newTag = tagInput.trim().replace(/^•\s*/, '');
            if (!tags.includes(newTag)) {
                handleTagsChange([...tags, newTag]);
            }
            setTagInput('');
        } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
            handleTagsChange(tags.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove: string) => {
        handleTagsChange(tags.filter(t => t !== tagToRemove));
    };

    // Render based on type
    switch (type) {
        case 'textarea':
            return <TextareaVariable label={label} value={value} onChange={handleChange} />;

        case 'tags':
            return (
                <TagsVariable
                    label={label}
                    tags={tags}
                    tagInput={tagInput}
                    onTagInputChange={setTagInput}
                    onTagInputKeyDown={handleTagInputKeyDown}
                    onRemoveTag={removeTag}
                />
            );

        case 'select':
        case 'dropdown':
            return <SelectVariable label={label} value={value} options={options} onSelect={handleValueChange} />;

        case 'dataset':
        case 'combobox':
            return <DatasetVariable label={label} value={value} datasetId={datasetId} onSelect={handleValueChange} />;

        case 'number':
            return <NumberVariable label={label} value={value} min={min} max={max} step={step} onChange={handleChange} />;

        case 'checkbox':
            return <CheckboxVariable label={label} value={value} onChange={handleCheckboxChange} />;

        case 'range':
            return <RangeVariable label={label} value={value} min={min} max={max} step={step} onChange={handleValueChange} />;

        case 'date-range':
            return <DateRangeVariable label={label} value={value} onChange={handleValueChange} />;

        case 'date':
            return <DateVariable label={label} value={value} onChange={handleChange} />;

        case 'color':
            return <ColorVariable label={label} value={value} onChange={handleValueChange} />;

        case 'email':
            return <EmailVariable label={label} value={value} onChange={handleChange} />;

        case 'url':
            return <UrlVariable label={label} value={value} onChange={handleChange} />;

        case 'phone':
            return <PhoneVariable label={label} value={value} onChange={handleValueChange} />;

        case 'time':
            return <TimeVariable label={label} value={value} onChange={handleChange} />;

        case 'datetime':
            return <DatetimeVariable label={label} value={value} onChange={handleChange} />;

        case 'rating':
            return <RatingVariable label={label} value={value} max={max || 5} onChange={handleValueChange} />;

        case 'emoji':
            return <EmojiVariable label={label} value={value} onChange={handleValueChange} />;

        case 'multiselect':
            return <MultiselectVariable label={label} value={value} options={options} onChange={handleValueChange} />;

        case 'code':
            return <CodeVariable label={label} value={value} onChange={handleChange} />;

        case 'percentage':
            return <PercentageVariable label={label} value={value} onChange={handleValueChange} />;

        default:
            return <TextVariable label={label} value={value} onChange={handleChange} />;
    }
};
