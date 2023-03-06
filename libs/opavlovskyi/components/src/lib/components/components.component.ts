import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'opavlovskyi-components',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsComponent {}
