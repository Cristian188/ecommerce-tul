import {
  Component,
  ComponentFactoryResolver,
  Injector,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NzConfig } from 'ng-zorro-antd/core/config';

@Component({
  template: `
    <ng-template #nzIndicatorTpl>
      <span class="ant-spin-dot">
        <i
          nz-icon
          [nzType]="'loading-3-quarters'"
          [nzSpin]="true"
          style="font-size: 36px;"
        ></i>
      </span>
    </ng-template>
  `,
})
export class GlobalTemplatesComponent {
  @ViewChild('nzIndicatorTpl', { static: true })
  nzIndicator!: TemplateRef<void>;
}

export const nzConfigFactory = (
  injector: Injector,
  resolver: ComponentFactoryResolver
): NzConfig => {
  const factory = resolver.resolveComponentFactory(GlobalTemplatesComponent);
  const { nzIndicator } = factory.create(injector).instance;
  return {
    spin: {
      nzIndicator,
    },
    message: { nzTop: 120 },
    notification: { nzTop: 240 },
  };
};
