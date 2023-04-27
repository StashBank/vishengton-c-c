import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IStorageValue, localStorageValue } from '@opavlovskyi/utils';
import { CoreWebappModule } from '@vcc/ui/core';
import { AuthModule } from '@vcc/webapp/auth';
import { AppService } from '../app.service';

@Component({
  selector: 'vcc-profile',
  standalone: true,
  imports: [CoreWebappModule, AuthModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  darkModeCtrl = new FormControl();

  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {
    this.darkModeCtrl.valueChanges.subscribe(checked => this.toggleDarkTheme(checked))
    const darkMode = this.appService.darkMode;
    this.darkModeCtrl.setValue(darkMode);
  }

  toggleDarkTheme(checked: boolean) {
    this.appService.toggleDarkTheme(checked);
  }
}