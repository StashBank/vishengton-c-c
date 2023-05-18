import { Directive, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { FirebaseRepository } from '@opavlovskyi/ui/firebase';
import { BaseEntity, DataViewDescriptor } from '../interfaces';

@Directive({ })
export abstract class BaseDataViewComponent<T extends BaseEntity> implements OnInit {

  data$ = new BehaviorSubject<T[]>([])
  addRecordFormShown = false;
  abstract saveRecordForm: FormGroup;
  abstract dataViewDescriptor: DataViewDescriptor[];

  get sum$() {
    return this.data$.pipe(
      map(data => data.reduce(
        (arg, curr) => arg+= this.getAmount(curr), 0)
      )
    )
  }

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

  async remove(entity: T) {
    this.hideAddRecordForm();
    await this.firebaseRepository.delete(entity.id);
    this.loadData();
  }

  protected abstract getAmount(entity: T): number;
  protected abstract getCopyDefFormValues(entity: T): any;
  protected abstract getEditDefFormValues(entity: T): any;
}