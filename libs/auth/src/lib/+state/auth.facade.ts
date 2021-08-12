import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { Authenticate } from './auth.models';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  auth$ = this.store.select(AuthSelectors.getAuthState);
  user$ = this.store.select(AuthSelectors.getAuthUser);
  isLoggedIn$ = this.store.select(AuthSelectors.getAuthLoaded);

  constructor(private store: Store) {}

  singIn(auth: Authenticate) {
    this.store.dispatch(AuthActions.singIn({ auth }));
  }

  singUp(auth: Authenticate) {
    this.store.dispatch(AuthActions.singUp({ auth }));
  }

  singOut() {
    this.store.dispatch(AuthActions.singOut());
  }
}
