import { Injectable } from '@angular/core';
import { IStorageValue, localStorageValue } from '@opavlovskyi/utils';

@Injectable({ providedIn: 'root'})
export class AppService {
  @localStorageValue<boolean>('dark-mode', true)
  private darkModeValue!: IStorageValue<boolean>;

  get darkMode() {
    return this.darkModeValue.get(false)
  }

  set darkMode(value: boolean) {
    this.darkModeValue.set(value)
  }

  init() {
    this.toggleDarkTheme(this.darkMode)
  }

  toggleDarkTheme(checked: boolean) {
    if (checked) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    this.darkModeValue.set(checked);
  }
}