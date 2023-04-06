import { RouterModule } from '@angular/router';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { map, Observable, take } from 'rxjs';

import { FirebaseAppService } from '@opavlovskyi/ui/firebase';
import { IStorageValue, localStorageValue, timeout } from '@opavlovskyi/utils';
import { CoreWebappModule } from '@vcc/ui/core';
import { LeftSideNavComponent } from './left-side-nav/left-side-nav.component';
import { AppModule } from './app.module';
import { User } from 'firebase/auth';

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
export class AppComponent implements AfterViewInit {

  @ViewChild('snav', { read: MatSidenav }) sideNavRef!: MatSidenav;

  get isAuthorized$(): Observable<boolean> {
    return this.firestore.isAuthorized$;
  }

  get profile$(): Observable<User|null> {
    return this.firestore.user$;
  }

  private isMobile!: boolean;
  get isMobile$(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(state => this.isMobile = state.matches)
    );
  }

  @localStorageValue<boolean>('left-side-menu-opened', true)
  private leftSideNavOpened!: IStorageValue<boolean>;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly firestore: FirebaseAppService
  ) {}

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
