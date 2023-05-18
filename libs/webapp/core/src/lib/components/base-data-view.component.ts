import { Directive, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { FirebaseRepository } from '@opavlovskyi/ui/firebase';
import { BaseEntity, DataViewDescriptor, ILookup } from '../interfaces';

@Directive({ })
export abstract class BaseDataViewComponent<T extends BaseEntity> implements OnInit {

  data$ = new BehaviorSubject<T[]>([])
  addRecordFormShown = false;
  abstract saveRecordForm: FormGroup;
  abstract dataViewDescriptor: DataViewDescriptor[];

  protected readonly fb = inject(FormBuilder);
  protected readonly abstract firebaseRepository: FirebaseRepository<T>;
  
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
    this.data$.next(data);
  }
  
  edit(entity: T) {
    this.saveRecordForm.reset(
      this.getEditDefFormValues(entity)
    )
    this.showAddRecordForm();
  }

  copy(entity: T) {
    this.saveRecordForm.reset(
      this.getCopyDefFormValues(entity)
    )
    this.showAddRecordForm();
  }

  compareLookupWith(o1: ILookup, o2: ILookup): boolean {
    return o1.id === o2.id
  }

  async remove(entity: T) {
    this.hideAddRecordForm();
    await this.firebaseRepository.delete(entity.id);
    this.loadData();
  }

  protected getCopyDefFormValues(entity: T): unknown {
    return entity;
  }
  protected getEditDefFormValues(entity: T): unknown {
    return entity;
  }
}