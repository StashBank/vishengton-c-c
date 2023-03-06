import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'opavlovskyi-opavlovskyi-ui-common',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opavlovskyi-ui-common.component.html',
  styleUrls: ['./opavlovskyi-ui-common.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpavlovskyiUiCommonComponent {}
