import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAppService } from '@opavlovskyi/ui/firebase';
import { CoreWebappModule } from '@vcc/ui/core';

interface IMenuItem {
  title: string;
  route?: string;
  icon?: string;
  canExec?: () => boolean,
  click?: () => void
}

@Component({
  selector: 'vcc-left-side-nav',
  standalone: true,
  imports: [CoreWebappModule],
  templateUrl: './left-side-nav.component.html',
  styleUrls: ['./left-side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSideNavComponent {
  @Output() menuItemClick = new EventEmitter<void>();

  menuNavItems: IMenuItem[] = [
    {
      route: 'home',
      title: 'Home'
    },
    {
      route: 'debts',
      title: 'Debts'
    },
    {
      route: 'incomes',
      title: 'Incomes'
    },
    {
      route: 'clients',
      title: 'Clients'
    },
    {
      title: 'Sign Out',
      click: () => this.signOut()
    }
  ]

  get isAuthorized$(): Observable<boolean> {
    return this.firestore.isAuthorized$;
  }

  constructor(
    private readonly router: Router,
    private readonly firestore: FirebaseAppService
  ) {}

  onMenuItemClick(menuItem: IMenuItem): void {
    this.menuItemClick.emit();
    if (menuItem.route) {
      this.router.navigate([menuItem.route])
    } else if (menuItem.click) {
      menuItem.click();
    }
  }

  async signOut() {
    await this.firestore.signOut();
  }
}
