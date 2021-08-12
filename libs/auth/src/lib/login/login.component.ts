import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthFacade } from '../+state/auth.facade';

@Component({
  selector: 'tul-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.login(
        this.validateForm.get('userName').value,
        this.validateForm.get('password').value
      );
    }
  }

  private login(email: string, password: string) {
    this.authFacade.singIn({ email, password });
  }
}
