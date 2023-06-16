import { AfterViewInit, ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { OPCommonModule } from '../../common.module';
import { GridComponent } from '../grid/grid.component';
import { IBaseEntity, IViewConfig } from '../../interfaces';
import { DataType, ViewType } from '../../enums';
import { dataTypeToViewTypeMap, viewTypeToComponent } from '../../constants';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'opavlovskyi-page',
  standalone: true,
  imports: [
    OPCommonModule,
    PortalModule,
    GridComponent,
  ],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements AfterViewInit {
  @Input() viewConfig!: IViewConfig<IBaseEntity>;
  @Input() data?: IBaseEntity;

  componentPortal: ComponentPortal<BaseComponent<IBaseEntity>>|null = null;

  private get dataType() {
    return this.viewConfig.dataType;
  }

  private get viewType() {
    if (this.viewConfig.viewType) {
      return this.viewConfig.viewType;
    }
    const dataType = this.dataType;
    if (dataType && dataTypeToViewTypeMap.has(dataType)) {
      return dataTypeToViewTypeMap.get(dataType)
    }
    return ViewType.textInput;
  }

  private get viewComponent() {
    if (this.viewConfig.viewComponent) {
      return this.viewConfig.viewComponent;
    }
    const viewType = this.viewType;
    if(viewType && viewTypeToComponent.has(viewType)) {
      return viewTypeToComponent.get(viewType);
    }
    return null;
  }

  ngAfterViewInit(): void {
    this.render();
  }

  private render() {
    null
  }

}
