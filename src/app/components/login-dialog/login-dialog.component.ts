import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private _snackBar: MatSnackBar
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  login() {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');

    if (emailControl && passwordControl) {
      console.log('Email value:', emailControl.value);
      console.log('Password value:', passwordControl.value);
    }
    this.close();
    this._snackBar.open('Login Successful', 'X', {
      duration: 3000,
    });
  }

  close() {
    this.dialogRef.close();
  }
}
