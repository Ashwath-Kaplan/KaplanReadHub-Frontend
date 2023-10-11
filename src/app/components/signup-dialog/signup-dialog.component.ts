import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { UserApiService } from 'src/app/services/users-api/users-api.service';
import { IUserApiResponse } from 'src/app/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupDialogComponent {
  passwordVisibilty = false;

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
    // Convert type of passwoord to base64
    const userEnteredPassword = this.signupForm.get('password')?.value;
    const base64Password = btoa(userEnteredPassword);

    const userProfile = { ...this.signupForm.value, password: base64Password };
    this._userApi.signup(userProfile).subscribe(
      (res: IUserApiResponse) => {
        // Handle success
        this._snackBar.openSuccessSnackbar(res.message, 'Close');
        this.close();
      },
      (err: HttpErrorResponse) => {
        if (err.status === 0) {
          // Network error
          this._snackBar.openErrorSnackbar('Network Error', 'Close');
        } else {
          // Handle error
          this._snackBar.openErrorSnackbar(err.error.message, 'Close');
        }
        this.close();
      }
    );
  }

  close() {
    this._dialogRef.close();
  }
}
