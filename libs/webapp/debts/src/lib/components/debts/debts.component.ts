import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseRepository, InjectFirebaseRepository } from '@opavlovskyi/ui/firebase';
import { CoreWebappModule, DataViewComponent, DataViewDescriptor } from '@vcc/ui/core';
import { IDebt } from '../../interfaces';
import { BehaviorSubject, map } from 'rxjs';

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
export class DebtsComponent implements OnInit {

  saveRecordForm = this.fb.nonNullable.group({
    id: this.fb.nonNullable.control(''),
    date: this.fb.nonNullable.control(new Date()),
    name: this.fb.nonNullable.control('', [Validators.required]),
    amount: this.fb.nonNullable.control(0, [Validators.required, Validators.pattern(/\d{1,}/)])
  });
  addRecordFormShown = false;
  data$ = new BehaviorSubject<IDebt[]>([]);
  dataViewDescriptor: DataViewDescriptor[] = [
    { path: 'date', caption: 'Date', dataType: 'date' },
    { path: 'name', caption: 'Name'},
    { path: 'amount', caption: 'Amount', dataType: 'currency' },
  ]

  get sum$() {
    return this.data$.pipe(
      map(data => data.reduce((arg, curr) => arg+= curr.amount, 0))
    )
  }

  @InjectFirebaseRepository<IDebt>('debts')
  private readonly firebaseRepository!: FirebaseRepository<IDebt>;

  constructor(
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  showAddRecordForm() {
    this.addRecordFormShown = true;
  }

  hideAddRecordForm() {
    this.saveRecordForm.reset();
    this.addRecordFormShown = false;
  }
  
  async saveRecord() {
    const values = {...this.saveRecordForm.value}
    if (values.id) {
      await this.firebaseRepository.update(values.id, values);
    } else {
      delete values.id;
      await this.firebaseRepository.create({
        ...values
      });
    }
    this.hideAddRecordForm();
    this.loadData();
  }

  async loadData() {
    const data = await this.firebaseRepository.list();
    this.data$.next(data)
  }
  
  edit(entity: IDebt) {
    this.saveRecordForm.reset({
      ...entity,
      date: new Date((entity.date as any).seconds * 1000)
    })
    this.showAddRecordForm()
  }

  copy(entity: IDebt) {
    const values = entity as Omit<IDebt, 'id'>
    this.saveRecordForm.reset({
      ...values,
      date: new Date((entity.date as any).seconds * 1000),
      id: undefined
    })
    this.showAddRecordForm()
  }

  async remove(entity: IDebt) {
    this.hideAddRecordForm();
    await this.firebaseRepository.delete(entity.id)
    this.loadData();
  }
}
