import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { map, Observable } from 'rxjs';

import { FirebaseAppService } from '@opavlovskyi/ui/firebase';
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
export class AppComponent {

  darkModeCtrl = new FormControl();

  get isAuthorized$(): Observable<boolean> {
    return this.firestore.isAuthorized$;
  }

  get isMobile$(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(state => state.matches)
    );
  }

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly firestore: FirebaseAppService
  ) {}

  ngOnInit() {
    const darkModeJson = localStorage.getItem('dark-mode');
    if (darkModeJson) {
      try {
        const darkMode = JSON.parse(darkModeJson);
        this.darkModeCtrl.setValue(darkMode)
        this.toggleDarkTheme(darkMode)
      } catch (e){ null }
    }
    this.darkModeCtrl.valueChanges.subscribe(checked => this.toggleDarkTheme(checked))
  }

  toggleDarkTheme(checked: boolean) {
    if (checked) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    localStorage.setItem('dark-mode', JSON.stringify(checked));
  }

  async signIn() {
    await this.firestore.signIn()
  }
}
