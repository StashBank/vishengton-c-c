import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FirebaseModule } from '@opavlovskyi/ui/firebase';
import { CoreWebappModule } from '../../core.module';
import { DataType } from '../../interfaces';

@Component({
  selector: 'vishengton-c-c-value-view',
  standalone: true,
  imports: [
    CoreWebappModule,
    FirebaseModule
  ],
  template: `
    <ng-container [ngSwitch]="dataType">
      <div *ngSwitchCase="'date'">{{ value | firebaseDate | date }}</div>
      <div *ngSwitchCase="'currency'">{{ value | currency }}</div>
      <div *ngSwitchCase="'number'">{{ value | number }}</div>
      <div *ngSwitchCase="'custom'">{{ converter? converter(value) : value }}</div>
      <div *ngSwitchDefault>{{ value }}</div>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueViewComponent {
  @Input() value?: any;
  @Input() dataType?: DataType;
  @Input() converter?: (val: any) => string;
}
