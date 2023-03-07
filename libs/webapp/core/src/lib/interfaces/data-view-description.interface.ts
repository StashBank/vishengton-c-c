export interface DataViewDescriptor {
  path: string;
  caption: string;
  dataType?: 'string' | 'date' | 'currency' | 'number' | 'custom';
  converter?: (val: any) => string;
}
