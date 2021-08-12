import { createAction, props } from '@ngrx/store';
import { Authenticate, User } from './auth.models';

export const singIn = createAction(
  '[Auth Page] SingIn',
  props<{ auth: Authenticate }>()
);

export const singInSuccess = createAction(
  '[Auth API] SingIn Success',
  props<{ user: User }>()
);

export const singInFail = createAction(
  '[Auth API] SingIn Fail',
  props<{ error: any }>()
);

export const singUp = createAction(
  '[Auth Page] SingUp',
  props<{ auth: Authenticate }>()
);

export const singUpSuccess = createAction(
  '[Auth API] SingUp Success',
  props<{ user: User }>()
);

export const singUpFail = createAction(
  '[Auth API] SingUp Fail',
  props<{ error: any }>()
);

export const singOut = createAction('[Auth API] SingOut');

export const singOutSuccess = createAction('[Auth API] SingOut Success');

export const singOutFail = createAction('[Auth API] SingOut Fail');
