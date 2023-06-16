import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { DataType, IViewConfig, PageComponent } from '@opavlovskyi/ui/common';
import { FirebaseRepository, InjectFirebaseRepository } from '@opavlovskyi/ui/firebase';
import {
  CoreWebappModule,
  DataViewComponent,
  DataViewDescriptor
} from '@vcc/ui/core';
import { IContragent } from '../../interfaces';

@Component({
  selector: 'vishengton-c-c-contragents',
  standalone: true,
  imports: [
    CoreWebappModule,
    DataViewComponent,
    PageComponent,
  ],
  templateUrl: './contragent.component.html',
  styleUrls: ['./contragent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContragentComponent <IContragent> {
  dataViewDescriptor: DataViewDescriptor[] = [
    { path: 'name', caption: 'Name'},
    { path: 'phoneNumber', caption: 'Phone Number', dataType: 'phone'},
    { path: 'email', caption: 'E-Mail', dataType: 'email'},
  ]
  @InjectFirebaseRepository<IContragent>('contragents')
  protected firebaseRepository!: FirebaseRepository<IContragent>;

  viewConfig: IViewConfig<any> =  {
    id: 'contragents-section-page',
    name: 'ContragentsSectionPage',
    components: [
      {
        id: 'name-input',
        name: 'Name',
        valuePath: 'name',
        dataType: DataType.string,
        gridLayout: {
          col: 1,
          row: 1,
          colSpan: 6
        }
      },
      {
        id: 'phone-number-input',
        name: 'Phone Number',
        valuePath: 'phoneNumber',
        dataType: DataType.string,
        gridLayout: {
          col: 6,
          row: 1,
          colSpan: 6
        }
      },
      {
        id: 'email-input',
        name: 'Email',
        valuePath: 'email',
        dataType: DataType.string,
        gridLayout: {
          col: 1,
          row: 2,
          colSpan: 6
        }
      },
    ]
  }
}
