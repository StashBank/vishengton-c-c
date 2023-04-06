import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IStorageValue, localStorageValue } from '@opavlovskyi/utils';
import { CoreWebappModule } from '@vcc/ui/core';
import { AuthModule } from '@vcc/webapp/auth';

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

  @localStorageValue<boolean>('dark-mode', true)
  private darkModeValue!: IStorageValue<boolean>;

  ngOnInit(): void {
    this.darkModeCtrl.valueChanges.subscribe(checked => this.toggleDarkTheme(checked))
    const darkMode = this.darkModeValue.get();
    this.darkModeCtrl.setValue(darkMode);
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