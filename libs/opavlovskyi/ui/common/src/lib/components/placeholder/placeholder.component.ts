import { ChangeDetectionStrategy, Component, ComponentRef } from '@angular/core';
import { CdkPortalOutletAttachedRef, ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { BaseComponent } from '../base/base.component';
import { IBaseEntity } from '../../interfaces/base.entity';
import { OPCommonModule } from '../../common.module';
import { dataTypeToViewTypeMap, viewTypeToComponent } from '../../constants';
import { ViewType } from '../../enums';

@Component({
  selector: 'opavlovskyi-placeholder',
  standalone: true,
  imports: [OPCommonModule],
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent<T extends IBaseEntity> extends BaseComponent<T> {
  componentPortal: ComponentPortal<BaseComponent<IBaseEntity>>|null = null;

  protected get viewType() {
    if (this.viewConfig.viewType) {
      return this.viewConfig.viewType;
    }
    const dataType = this.dataType;
    if (dataType && dataTypeToViewTypeMap.has(dataType)) {
      return dataTypeToViewTypeMap.get(dataType)
    }
    return ViewType.textInput;
  }

  protected get viewComponent(): BaseComponent<IBaseEntity> | null | undefined {
    if (this.viewConfig.viewComponent) {
      return this.viewConfig.viewComponent as unknown as BaseComponent<IBaseEntity>;
    }
    const viewType = this.viewType;
    if(viewType && viewTypeToComponent.has(viewType)) {
      return viewTypeToComponent.get(viewType);
    }
    return null;
  }

  onAttached(ref: CdkPortalOutletAttachedRef) {
    const cmp = ref as ComponentRef<BaseComponent<T>>;
    cmp.instance.viewConfig = this.viewConfig;
  }

  protected render() {
    const viewComponent = this.viewComponent as unknown as ComponentType<BaseComponent<IBaseEntity>>;
    if (viewComponent) {
      this.componentPortal = new ComponentPortal(viewComponent)
    }
  }
}
