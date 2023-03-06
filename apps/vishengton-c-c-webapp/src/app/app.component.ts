import { RouterModule } from '@angular/router';
import { ChangeDetectorRef, Component } from '@angular/core';

import { CoreModule } from '@vcc/ui/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LeftSideNavComponent } from './left-side-nav/left-side-nav.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CoreModule,
    LeftSideNavComponent
  ],
  selector: 'vcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleDarkTheme(evt: MatSlideToggleChange) {
    if (evt.checked) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }
}
