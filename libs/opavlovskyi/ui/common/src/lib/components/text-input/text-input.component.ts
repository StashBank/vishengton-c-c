import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { IBaseEntity } from '../../interfaces/base.entity';
import { OPCommonModule } from '../../common.module';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'opavlovskyi-text-input',
  standalone: true,
  imports: [OPCommonModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent<T extends IBaseEntity> extends BaseComponent<T> {
  private fb = inject(FormBuilder);
  control = this.fb.nonNullable.control<string>('')

  protected render() {
    null;
  }
}
