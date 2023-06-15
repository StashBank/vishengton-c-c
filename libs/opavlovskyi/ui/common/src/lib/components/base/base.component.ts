import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IViewComponent } from '../../interfaces/view-component.interface';
import { IViewConfig } from '../../interfaces/view-config.interface';
import { BaseEntityFieldValue, IBaseEntity } from '../../interfaces/base.entity';

@Component({
  selector: 'opavlovskyi-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseComponent<T extends IBaseEntity> implements IViewComponent<T> {
  viewConfig!: IViewConfig<T>;
  data?: T;

  get value(): BaseEntityFieldValue {
    const valuePath = this.viewConfig.valuePath || ''
    return this.data ? this.data[valuePath] : null
  }

  set value(value: BaseEntityFieldValue) {
    const valuePath = this.viewConfig.valuePath || '';
    if (valuePath && !this.viewConfig.disabled && this.data) {
      (this.data as IBaseEntity)[valuePath] = value;
    }
  }

  click(): void {
    if (this.viewConfig?.onClick) {
      this.viewConfig.onClick(this.data);
    }
  }
  doubleClick(): void {
    if (this.viewConfig.onDoubleClick) {
      this.viewConfig.onDoubleClick(this.data);
    }
  }
  disable(): void {
    this.viewConfig.disabled = true;
  }
  enable(): void {
    this.viewConfig.disabled = false;
  }
  hide(): void {
    this.viewConfig.hidden = true;
  }
  show(): void {
    this.viewConfig.hidden = false;
  }
  focus(): void {
    if (this.viewConfig.onFocus) {
      this.viewConfig.onFocus(this.data);
    }
  }
}
