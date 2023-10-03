import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { UserApiService } from 'src/app/services/users/users-api.service';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss'],
})
export class SignupDialogComponent {
  hide = true;

  constructor(
    public _dialogRef: MatDialogRef<SignupDialogComponent>,
    private _userApi: UserApiService,
    public _snackBar: SnackBarService
  ) {}

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl(null, [Validators.required]),
  });

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  signup() {
    this.markFormGroupTouched(this.signupForm);

    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this._userApi.signup(userData).subscribe(
        (res: any) => {
          // Handle success
          this._snackBar.openSuccessSnackbar(res.message, 'Okay');
          this.close();
        },
        (err: any) => {
          if (err.status === 0) {
            // Network error
            this._snackBar.openErrorSnackbar('Network Error', 'Okay');
          } else {
            // Handle error
            this._snackBar.openErrorSnackbar(err.error.message, 'Okay');
          }
          this.close();
        }
      );
    }
  }

  close() {
    this._dialogRef.close();
  }
}
