import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';

import { FirebaseAppService } from '@opavlovskyi/ui/firebase';
import { IStorageValue, localStorageValue } from '@opavlovskyi/utils';
import { CoreModule } from '@vcc/ui/core';
import { LeftSideNavComponent } from './left-side-nav/left-side-nav.component';
import { AppModule } from './app.module';
import { FormControl } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CoreModule,
    AppModule,
    LeftSideNavComponent,
  ],
  selector: 'vcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  darkModeCtrl = new FormControl();

  get isAuthorized$(): Observable<boolean> {
    return this.firestore.isAuthorized$;
  }

  get isMobile$(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(state => state.matches)
    );
  }

  @localStorageValue<boolean>('dark-mode', true)
  private darkModeValue!: IStorageValue<boolean>;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly firestore: FirebaseAppService
  ) {}

  ngOnInit(): void {
    this.darkModeCtrl.valueChanges.subscribe(checked => this.toggleDarkTheme(checked))
    const darkMode = this.darkModeValue.get();
    this.darkModeCtrl.setValue(darkMode)
  }

  toggleDarkTheme(checked: boolean) {
    if (checked) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    this.darkModeValue.set(checked);
  }

  async signIn() {
    await this.firestore.signIn()
  }
}
