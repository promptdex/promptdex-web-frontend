// Types and constants for Variable nodes
export type VariableType = 
    | 'text'
    | 'textarea'
    | 'select'
    | 'dropdown'
    | 'tags'
    | 'dataset'      // Pulls options from system datasets with filter
    | 'combobox'     // Searchable select with custom input
    | 'number'       // Numeric input with optional min/max
    | 'date'         // Date picker
    | 'checkbox'     // Boolean toggle
    | 'radio'        // Radio button group
    | 'color'        // Color picker
    | 'range'        // Slider
    | 'email'        // Email with validation
    | 'url'          // URL with validation
    | 'phone'        // Phone with formatting
    | 'time'         // Time picker
    | 'datetime'     // Date and time combined
    | 'rating'       // Star rating
    | 'emoji'        // Emoji picker
    | 'multiselect'  // Multiple selection
    | 'code'         // Code editor
    | 'percentage';  // Percentage input 0-100%

export interface VariableAttributes {
    label: string;
    value: string;
    type: VariableType;
    options: string[];
    datasetId?: string;  // For dataset type
    min?: number;        // For number/range/rating
    max?: number;        // For number/range/rating
    step?: number;       // For number/range
}

export const defaultVariableAttributes: VariableAttributes = {
    label: 'variable',
    value: '',
    type: 'text',
    options: [],
};

// Regex to match [Topic] or [Any Label]
export const variableRegex = /\[(.*?)\]/g;

// Parse variable content from bracket notation: "Label:type:opt1,opt2" or "Label:dataset:datasetId"
export const parseVariableContent = (content: string): Partial<VariableAttributes> => {
    const parts = content.split(':');
    const label = parts[0] || 'variable';
    const type = (parts[1] as VariableType) || 'text';
    
    // For dataset type, third part is datasetId
    if (type === 'dataset' || type === 'combobox') {
        return { label, type, datasetId: parts[2] };
    }
    
    // For number/range/rating, third part could be "min,max,step"
    if (type === 'number' || type === 'range' || type === 'rating') {
        const [min, max, step] = (parts[2] || '').split(',').map(Number);
        return { label, type, min: min || 0, max: max || (type === 'rating' ? 5 : 100), step: step || 1 };
    }
    
    const options = parts[2] ? parts[2].split(',') : [];
    return { label, type, options };
};

// Serialize variable to text format
export const serializeVariable = (attrs: VariableAttributes): string => {
    if (attrs.value) return attrs.value;
    const typeSuffix = attrs.type !== 'text' ? `:${attrs.type}` : '';
    return `[${attrs.label}${typeSuffix}]`;
};
