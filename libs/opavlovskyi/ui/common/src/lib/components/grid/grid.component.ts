import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { IBaseEntity } from '../../interfaces/base.entity';
import { OPCommonModule } from '../../common.module';
import { PlaceholderComponent } from '../placeholder/placeholder.component';

@Component({
  selector: 'opavlovskyi-grid',
  standalone: true,
  imports: [
    OPCommonModule,
    PlaceholderComponent
  ],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent<T extends IBaseEntity> extends BaseComponent<T> {

  get blocks() {
    return this.viewConfig.components
      ?.sort((a, b) => {
        if (a.gridLayout && b.gridLayout) {
          if (a.gridLayout.row > b.gridLayout.row) {
            return 1
          } else if (a.gridLayout.row < b.gridLayout.row) {
            return -1
          } else if (a.gridLayout.col > b.gridLayout.col) {
            return 1
          } else if (a.gridLayout.col < b.gridLayout.col) {
            return -1
          } else {
            return 0
          }
        }
        if (a.gridLayout && !b.gridLayout) {
          return 1
        }
        if (!a.gridLayout && b.gridLayout) {
          return -1
        }
        return 0
      })
  }

  getBlockClass(config: {
    row: number;
    rowSpan?: number | undefined;
    col: number;
    colSpan?: number | undefined;
  } | undefined): string[] {
    const classes = ['col-start-' + (config?.col || 1)];
    if (config) {
      if (config.colSpan) {
        classes.push('col-span-' + config.colSpan)
      }
      if (config.row) {
        classes.push('row-start-' + config.row)
      }
      if (config.rowSpan) {
        classes.push('row-span-' + config.row)
      }
    } else {
      classes.push('col-span-12')
    }
    return classes;
  }

  protected render() {
    null;
  }
}
