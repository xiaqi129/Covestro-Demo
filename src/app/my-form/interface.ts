export interface DynamicField {
    key: string;
    value: any;
    type: 'string' | 'number' | 'array' | 'object' | 'boolean' | 'array-object';
    fields?: DynamicField[];
    options?: any[];
    isArrayItem?: boolean;
    arrayItemIndex?: number;
  }