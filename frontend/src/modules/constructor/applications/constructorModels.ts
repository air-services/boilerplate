export interface ApplicationField {
  id: number;
  name: string;
  description: string;
  dataTypeId: number;
  foreignKeyId?: number;
  isPrimaryKey?: boolean;
  isIndex?: boolean;
  size: number;
}

export interface Application {
  id: number;
  name: string;
  tableName: string;
  fields: ApplicationField[];
}

export interface DataType {
  id: number;
  name: string;
}

export interface FieldsCache {
  [id: string]: ApplicationField;
}

export interface DataTypesCache {
  [id: string]: DataType;
}
