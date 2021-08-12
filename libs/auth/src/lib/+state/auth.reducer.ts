import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import firebase from 'firebase';
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends EntityState<firebase.User> {
  selectedId?: string | number; // which Auth record has been selected
  loaded: boolean; // has the Auth list been loaded
  error?: string | null; // last known error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const authAdapter: EntityAdapter<firebase.User> = createEntityAdapter<firebase.User>();

export const initialState: State = authAdapter.getInitialState({
  selectedId: null,
  loaded: false,
  error: null,
});

const authReducer = createReducer(
  initialState,
  on(AuthActions.singIn, (state) => ({ ...state, loaded: false, error: null })),
  on(AuthActions.singInSuccess, (state) => ({
    ...state,
    user: state,
    loaded: true,
    error: null,
  })),
  on(AuthActions.singInFail, (state, { error }) => ({
    ...state,
    loaded: false,
    error,
  })),
  on(AuthActions.singUp, (state) => ({ ...state, loaded: false, error: null })),
  on(AuthActions.singUpSuccess, (state) => ({
    ...state,
    loaded: true,
    error: null,
  })),
  on(AuthActions.singUpFail, (state, { error }) => ({
    ...state,
    loaded: false,
    error,
  })),
  on(AuthActions.singOut, () => initialState)
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
