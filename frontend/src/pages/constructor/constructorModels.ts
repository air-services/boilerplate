export interface TemplateField {
  id: number;
  name: string;
  description: string;
  data_type_id: number;
  size: number;
}

export interface Template {
  id: number;
  name: string;
  fields: TemplateField[];
}

export interface DataType {
  id: number;
  name: string;
}
