import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss'],
})
export class SignupDialogComponent {
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<SignupDialogComponent>,
    private _snackBar: MatSnackBar
  ) {}

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  signup() {
    const firstNameValue = this.signupForm.get('firstName');
    const lastNameValue = this.signupForm.get('lastName');
    const emailValue = this.signupForm.get('email');
    const passwordValue = this.signupForm.get('password');

    if (firstNameValue && lastNameValue && emailValue && passwordValue) {
      console.log('First name: ', firstNameValue.value);
      console.log('Last name: ', lastNameValue.value);
      console.log('Email value:', emailValue.value);
      console.log('Password value:', passwordValue.value);
    }
    this.close();
    this._snackBar.open('Sign up Successful', 'X', {
      duration: 3000,
    });
  }

  close() {
    this.dialogRef.close();
  }
}
