import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firebaseDate',
  pure: true
})
export class FirebaseDatePipe implements PipeTransform{
  transform(value: any, ...args: any[]) {
    if (value?.seconds) {
      return new Date(value.seconds * 1000)
    }
    return null;
  }
}