import { FirebaseRepository } from '@opavlovskyi/ui/firebase';
import { BaseEntity } from '../interfaces';

export abstract class BaseDataService<T extends BaseEntity> {

  protected readonly abstract firebaseRepository: FirebaseRepository<T>;

  create(dto: T) {
    return this.firebaseRepository.create(dto)
  }

  getById(id:string) {
    return this.firebaseRepository.getById(id)
  }

  list() {
    return this.firebaseRepository.list()
  }

  update(id: string, dto: T) {
    return this.firebaseRepository.update(id, dto)
  }

  delete(id: string) {
    return this.firebaseRepository.delete(id)
  }

}