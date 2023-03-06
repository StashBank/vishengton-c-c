import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoreModule } from '@vcc/ui/core';

@Component({
  selector: 'vcc-left-side-nav',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './left-side-nav.component.html',
  styleUrls: ['./left-side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSideNavComponent {
  menuItems: {
    route: string;
    title: string;
    icon?: string;
    canExec?: () => boolean,
    click?: () => void
  }[] = [
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
    }
  ]
}
