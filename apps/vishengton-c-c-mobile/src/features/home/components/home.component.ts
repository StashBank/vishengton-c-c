import { Component } from '@angular/core';
import { FirebaseAppService } from '@opavlovskyi/mobile/firebase';
import { of } from 'rxjs';
import { setStatusBarColor } from '../../../utils';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  get isAuthorized$() {
    //return this.firebaseApp.isAuthorized$
    return of(false);
  }

  constructor(
    private readonly firebaseApp: FirebaseAppService
  ) {}

  async signIn() {
    await this.firebaseApp.signIn()
  }

  ngOnInit() {
    setStatusBarColor('dark', '#97d9e9');
  }

}
