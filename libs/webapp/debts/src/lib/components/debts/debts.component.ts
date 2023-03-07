import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseDbService } from '@opavlovskyi/ui/firebase';
import { CoreWebappModule, DataViewComponent, DataViewDescriptor } from '@vcc/ui/core';

@Component({
  selector: 'vishengton-c-c-debts',
  standalone: true,
  imports: [
    CoreWebappModule,
    DataViewComponent,
  ],
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtsComponent implements OnInit {

  addRecordForm = this.fb.group({
    date: [new Date()],
    name: [null, [Validators.required]],
    amount: [null, [Validators.required, Validators.pattern(/\d{1,}/)]]
  });
  addRecordFormShown = false;
  data$!: Promise<any[]>;
  dataViewDescriptor: DataViewDescriptor[] = [
    { path: 'date', caption: 'Date', dataType: 'date' },
    { path: 'name', caption: 'Name'},
    { path: 'amount', caption: 'Amount', dataType: 'currency' },
  ]
  private readonly collectionName = 'debts';

  private get collectionRef() {
    return this.firebaseDb.collection(this.collectionName);
  }

  constructor(
    private readonly firebaseDb: FirebaseDbService,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  showAddRecordForm() {
    this.addRecordFormShown = true;
  }

  hideAddRecordForm() {
    this.addRecordForm.reset();
    this.addRecordFormShown = false;
  }
  
  async saveRecord() {
    await this.firebaseDb.add(this.collectionRef, this.addRecordForm.value);
    this.hideAddRecordForm();
    this.loadData();
  }

  loadData() {
    this.data$ = this.firebaseDb.get(this.collectionRef);
  }
}
