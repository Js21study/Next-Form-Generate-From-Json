import * as Yup from 'yup';

export interface FormFields {
  name: string;
  default_value?: string | number | boolean;
  value?: string | number | boolean;
  validation?: string;
  min_value?: number;
  max_value?: number;
  options?: string[] | number[];
  type: 'text' | 'longtext' | 'dropdown' | 'number';
}

export interface FormValues {
  [key: string]: string | number | boolean;
}

export type Schemas = Record<
  string,
  Yup.MixedSchema | Yup.NumberSchema | Yup.StringSchema
>;
