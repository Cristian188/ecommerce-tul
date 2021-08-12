import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

const routes = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
]);

const NZ_MODULES = [
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzCheckboxModule,
  NzTypographyModule,
];
@NgModule({
  imports: [
    CommonModule,
    FormGroup,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    ReactiveFormsModule,
    routes,
    ...NZ_MODULES,
  ],
  providers: [AuthFacade],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
