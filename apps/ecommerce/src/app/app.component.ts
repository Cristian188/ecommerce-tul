import { Component } from '@angular/core';
import { AuthFacade } from '@tul/auth';

@Component({
  selector: 'tul-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ecommerce';

  constructor(private authFacade: AuthFacade) {}

  onLogOutClick() {
    this.authFacade.singOut();
  }
}
