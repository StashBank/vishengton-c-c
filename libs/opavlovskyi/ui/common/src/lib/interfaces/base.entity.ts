export interface ILookup { 
  id: string;
  value: string;
}

export type BaseEntityFieldValue = string | number | Date | ILookup | null | undefined | Array<{[key: string]: BaseEntityFieldValue}>;

export interface IBaseEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdById?: string;
  updatedById?: string;
  [key: string]: BaseEntityFieldValue;
}