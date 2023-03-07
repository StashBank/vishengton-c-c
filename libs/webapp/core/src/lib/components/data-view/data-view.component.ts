import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { FirebaseModule } from '@opavlovskyi/ui/firebase';
import { CoreWebappModule } from '../../core.module';
import { DataViewDescriptor } from '../../interfaces';

@Component({
  selector: 'vishengton-c-c-data-view',
  standalone: true,
  imports: [
    CoreWebappModule,
    FirebaseModule
  ],
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewComponent {

  @Input() title!: string;
 
  private _data!: any[];
  @Input() set data(values: any[] | null) {
    this._data = values || [];
  }
  get data(): any[] {
    return this._data;
  }

  @Input() descriptor!: DataViewDescriptor[];
  @Output() add = new EventEmitter<void>();
  @Output() rowActionCopy = new EventEmitter<any>();
  @Output() rowActionEdit = new EventEmitter<any>();
  @Output() rowActionDelete = new EventEmitter<any>();

  get displayedColumns(): string[] {
    return this.descriptor.map(d => d.path)
  }

  constructor(private bottomSheet: MatBottomSheet) {}


  selectRow(rowData: any) {
    this.bottomSheet.open(DataViewActionsComponent, {
      data: {
        copy: () => this.rowActionCopy.emit(rowData),
        edit: () => this.rowActionEdit.emit(rowData),
        delete: () => this.rowActionDelete.emit(rowData),
      }
    })
  }
}

interface ActionDef {
  title: string;
  line: string;
  action: string;
}


@Component({
  selector: 'vishengton-c-c-data-view-actions',
  standalone: true,
  imports: [
    CoreWebappModule
  ],
  template: `
    <mat-nav-list>
      <ng-container *ngFor="let actionDef of actionDefs">
        <a mat-list-item (click)="onAction(actionDef)">
          <span matListItemTitle>{{ actionDef.title }}</span>
          <span matLine>{{ actionDef.line }}</span>
        </a>
      </ng-container>
    </mat-nav-list>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataViewActionsComponent {

  actionDefs: ActionDef[] = [
    { title: 'Copy', line: 'copy the record', action: 'copy' },
    { title: 'Edit', line: 'edit the record', action: 'edit' },
    { title: 'Delete', line: 'delete the record', action: 'delete' },
  ]

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<DataViewActionsComponent>
  ) { }

  onAction(def: ActionDef) {
    this.data[def.action]();
    this.bottomSheetRef.dismiss();
  }
}