import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IBaseEntity } from '../../interfaces';
import { BaseComponent } from '../base/base.component';
import { OPCommonModule } from '../../common.module';

@Component({
  selector: 'opavlovskyi-number-input',
  standalone: true,
  imports: [OPCommonModule],
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class NumberInputComponent<T extends IBaseEntity> extends BaseComponent<T> {
export class NumberInputComponent<T extends IBaseEntity> {
  protected render(): void {
    throw new Error('Method not implemented.');
  }
}
