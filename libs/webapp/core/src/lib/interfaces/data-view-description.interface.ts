import { DataType } from './types';
export interface DataViewDescriptor {
  path: string;
  caption: string;
  dataType?: DataType;
  converter?: (val: any) => string;
}
