import { DataType, ViewType } from '../enums';
import { IBaseEntity } from './base.entity';

export interface IViewConfig<T extends IBaseEntity> {
  id?: string;
  name?: string;
  label?: string;
  gridLayout?: {
    row: number,
    rowSpan?: number;
    col: number,
    colSpan?: number;
  };
  valuePath?: string;
  dataType?: DataType;
  viewType?: ViewType;
  disabled?: boolean;
  hidden?: boolean;
  components?: IViewConfig<any>[];
  onClick?: (value?: T) => void ;
  onDoubleClick?: (value?: T) => void ;
  onFocus?: (value?: T) => void;
  onHover?: (value?: T) => void;
}