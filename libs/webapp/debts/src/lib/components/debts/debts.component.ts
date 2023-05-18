import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FirebaseRepository, InjectFirebaseRepository } from '@opavlovskyi/ui/firebase';
import { BaseDataViewComponent, CoreWebappModule, DataViewComponent, DataViewDescriptor } from '@vcc/ui/core';
import { IDebt } from '../../interfaces';

@Component({
  selector: 'vishengton-c-c-debts',
  standalone: true,
  imports: [
    CoreWebappModule,
    DataViewComponent,
  ],
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DebtsComponent extends BaseDataViewComponent<IDebt> {

  saveRecordForm = this.fb.nonNullable.group({
    id: this.fb.nonNullable.control(''),
    date: this.fb.nonNullable.control(new Date()),
    name: this.fb.nonNullable.control('', [Validators.required]),
    amount: this.fb.nonNullable.control(0, [Validators.required, Validators.pattern(/\d{1,}/)])
  });
  dataViewDescriptor: DataViewDescriptor[] = [
    { path: 'date', caption: 'Date', dataType: 'date' },
    { path: 'name', caption: 'Name'},
    { path: 'amount', caption: 'Amount', dataType: 'currency' },
  ]

  @InjectFirebaseRepository<IDebt>('debts')
  protected readonly firebaseRepository!: FirebaseRepository<IDebt>;

  protected override getAmount(entity: IDebt): number {
    return entity.amount;
  }
  protected override getCopyDefFormValues(entity: IDebt) {
    return {
      ...entity,
      date: new Date((entity.date as any).seconds * 1000),
      id: undefined
    };
  }
  protected override getEditDefFormValues(entity: IDebt) {
    return {
      ...entity,
      date: new Date((entity.date as any).seconds * 1000)
    };
  }

}
