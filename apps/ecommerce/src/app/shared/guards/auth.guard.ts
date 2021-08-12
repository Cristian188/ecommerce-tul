import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthFacade } from '@tul/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authFacade: AuthFacade) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authFacade.isLoggedIn$.pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate([`/login`]);
          return false;
        }
      })
    );
  }
}
