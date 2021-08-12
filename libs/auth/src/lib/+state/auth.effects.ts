import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import firebase from 'firebase';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';
import { User } from './auth.models';

@Injectable()
export class AuthEffects {
  singIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.singIn),
      exhaustMap(({ auth }) =>
        this.authService.signIn(auth.email, auth.password).pipe(
          map((user: firebase.User) => {
            const tempUser: User = { uid: user.uid, email: user.displayName };
            return AuthActions.singInSuccess({ user: tempUser });
          }),
          catchError((error) => of(AuthActions.singInFail(error)))
        )
      )
    )
  );

  singInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.singInSuccess),
        tap(() => this.router.navigate(['/shop']))
      ),
    { dispatch: false }
  );

  singUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.singUp),
      exhaustMap(({ auth }) =>
        this.authService.signUp(auth.email, auth.password).pipe(
          map((user: firebase.User) => {
            const tempUser: User = { uid: user.uid, email: user.displayName };
            return AuthActions.singUpSuccess({ user: tempUser });
          }),
          catchError((error) => of(AuthActions.singUpFail(error)))
        )
      )
    )
  );

  singUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.singUpSuccess),
        tap(() => this.router.navigate(['/shop']))
      ),
    { dispatch: false }
  );

  singOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.singOut),
      exhaustMap(() =>
        this.authService.signOut().pipe(
          map(() => AuthActions.singOutSuccess()),
          catchError((error) => of(AuthActions.singUpFail(error)))
        )
      )
    )
  );

  singOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.singOutSuccess),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private cartService: AuthService,
    private router: Router
  ) {}
}
