import { IBaseEntity } from './base.entity';
import { IViewConfig } from './view-config.interface';

export interface IViewComponent<T  extends IBaseEntity> {
  viewConfig: IViewConfig<T>;
  data?: T;
  click(): void;
  doubleClick(): void;
  disable(): void;
  enable(): void;
  hide(): void;
  show(): void;
  focus(): void;
}