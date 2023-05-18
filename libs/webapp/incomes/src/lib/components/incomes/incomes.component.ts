import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { FirebaseRepository, InjectFirebaseRepository } from '@opavlovskyi/ui/firebase';
import {
  BaseDataViewComponent,
  CoreWebappModule,
  DataViewComponent,
  DataViewDescriptor,
  ILookup
} from '@vcc/ui/core';
import { IContragent } from '@vcc/webapp/contragents';
import { IIncome } from '../../interfaces';

@Component({
  selector: 'vishengton-c-c-incomes',
  standalone: true,
  imports: [
    CoreWebappModule,
    DataViewComponent,
  ],
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesComponent extends BaseDataViewComponent<IIncome> {
  override saveRecordForm = this.fb.nonNullable.group({
    id: this.fb.nonNullable.control(''),
    contragent: this.fb.nonNullable.control<ILookup>({}),
    date: this.fb.nonNullable.control(new Date()),
    name: this.fb.nonNullable.control('', [Validators.required]),
    amount: this.fb.nonNullable.control(0, [Validators.required, Validators.pattern(/\d{1,}/)])
  });
  override dataViewDescriptor: DataViewDescriptor[] = [
    { path: 'date', caption: 'Date', dataType: 'date' },
    { path: 'contragent', caption: 'Contragent', dataType: 'lookup' },
    { path: 'name', caption: 'Name'},
    { path: 'amount', caption: 'Amount', dataType: 'currency' },
  ]
  contragents$!: Promise<ILookup[]>

  get sum$() {
    return this.data$.pipe(
      map(data => data.reduce(
        (arg, curr) => arg+= curr.amount, 0)
      )
    )
  }

  @InjectFirebaseRepository<IIncome>('incomes')
  protected override firebaseRepository!: FirebaseRepository<IIncome>;
  @InjectFirebaseRepository<IContragent>('contragents')
  private contragentsRepository!: FirebaseRepository<IContragent>;

  override ngOnInit(): void {
    this.loadContragents()
    super.ngOnInit()
  }

  protected override getCopyDefFormValues(entity: IIncome) {
    return {
      ...entity,
      date: new Date((entity.date as any).seconds * 1000),
      id: undefined
    };
  }
  protected override getEditDefFormValues(entity: IIncome) {
    return {
      ...entity,
      date: new Date((entity.date as any).seconds * 1000)
    };
  }

  private loadContragents() {
    this.contragents$ = this.contragentsRepository.list()
    .then(
      contragents => contragents.map(
        contragent => ({
          id: contragent.id,
          name: contragent.name
        })
      ))
  }
}
