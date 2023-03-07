import { RouterModule } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { map, Observable, take } from 'rxjs';

import { FirebaseAppService } from '@opavlovskyi/ui/firebase';
import { IStorageValue, localStorageValue, microtask, timeout } from '@opavlovskyi/utils';
import { CoreWebappModule } from '@vcc/ui/core';
import { LeftSideNavComponent } from './left-side-nav/left-side-nav.component';
import { AppModule } from './app.module';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CoreWebappModule,
    AppModule,
    LeftSideNavComponent,
  ],
  selector: 'vcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('snav', { read: MatSidenav }) sideNavRef!: MatSidenav;
  darkModeCtrl = new FormControl();

  get isAuthorized$(): Observable<boolean> {
    return this.firestore.isAuthorized$;
  }

  private isMobile!: boolean;
  get isMobile$(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(state => this.isMobile = state.matches)
    );
  }

  @localStorageValue<boolean>('dark-mode', true)
  private darkModeValue!: IStorageValue<boolean>;

  @localStorageValue<boolean>('left-side-menu-opened', true)
  private leftSideNavOpened!: IStorageValue<boolean>;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly firestore: FirebaseAppService
  ) {}

  ngOnInit(): void {
    this.darkModeCtrl.valueChanges.subscribe(checked => this.toggleDarkTheme(checked))
    const darkMode = this.darkModeValue.get();
    this.darkModeCtrl.setValue(darkMode);
  }

  @timeout(800)
  ngAfterViewInit(): void {
    this.isMobile$.pipe(
      take(1)
    ).subscribe(() => {
      if (this.leftSideNavOpened.get(false)) {
        this.sideNavRef.open()
      }
    });
  }

  toggleDarkTheme(checked: boolean) {
    if (checked) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    this.darkModeValue.set(checked);
  }

  toggleSideNavMenu() {
    this.sideNavRef.toggle();
    this.leftSideNavOpened.set(this.sideNavRef.opened)
  }

  async onMenuItemClick() {
    if (this.isMobile) {
      this.sideNavRef.close();
      this.leftSideNavOpened.set(false)
    } 
  }

  async signIn() {
    await this.firestore.signIn()
  }
}
