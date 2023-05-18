import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FirebaseRepository, InjectFirebaseRepository } from '@opavlovskyi/ui/firebase';
import {
  BaseDataViewComponent,
  CoreWebappModule,
  DataViewComponent,
  DataViewDescriptor
} from '@vcc/ui/core';
import { IClient } from '../../interfaces';

@Component({
  selector: 'vishengton-c-c-clients',
  standalone: true,
  imports: [
    CoreWebappModule,
    DataViewComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent extends BaseDataViewComponent<IClient> {
  override saveRecordForm =  this.fb.nonNullable.group({
    id: this.fb.nonNullable.control(''),
    name: this.fb.nonNullable.control('', [Validators.required]),
    phoneNumber: this.fb.nonNullable.control('', [Validators.pattern('d{10}')]),
    email: this.fb.nonNullable.control('', [Validators.email]),
  });
  override dataViewDescriptor: DataViewDescriptor[] = [
    { path: 'name', caption: 'Name'},
    { path: 'phoneNumber', caption: 'Phone Number', dataType: 'phone'},
    { path: 'email', caption: 'E-Mail', dataType: 'email'},
  ]
  @InjectFirebaseRepository<IClient>('clients')
  protected override firebaseRepository!: FirebaseRepository<IClient>;
}
