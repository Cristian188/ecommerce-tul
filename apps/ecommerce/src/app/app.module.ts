import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { ComponentFactoryResolver, Injector, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { nzConfigFactory } from './shared/nz-zorro/global-templates.component';
import { IconsProviderModule } from './shared/nz-zorro/icons/icons-provider.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@tul/auth';
import { ProductsModule } from '@tul/products';
import { CartsModule } from '@tul/carts';
import { ItemsModule } from '@tul/items';
import { ShowAuthedDirective } from './shared/directives/show-authed';
registerLocaleData(en);

const NZ_MODULES = [
  NzLayoutModule,
  NzMenuModule,
  NzSpinModule,
  NzSliderModule,
  NzBreadCrumbModule,
  NzImageModule,
];
@NgModule({
  declarations: [AppComponent, ShowAuthedDirective],
  imports: [
    ...NZ_MODULES,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthModule,
    ProductsModule,
    CartsModule,
    ItemsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: NZ_CONFIG,
      useFactory: nzConfigFactory,
      deps: [Injector, ComponentFactoryResolver],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
