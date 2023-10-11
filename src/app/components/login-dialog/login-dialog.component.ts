import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserApiService } from 'src/app/services/users-api/users-api.service';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { IUserApiLoginResponse } from 'src/app/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginDialogComponent {
  passwordVisibilty = false;

  constructor(
    public _dialogRef: MatDialogRef<LoginDialogComponent>,
    private _userApi: UserApiService,
    public _snackBar: SnackBarService,
    private _router: Router,
    private _authService: AuthenticationService
  ) {}

  loginForm: FormGroup = new FormGroup({
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

  login() {
    const userEnteredPassword = this.loginForm.get('password')?.value;
    const base64Password = btoa(userEnteredPassword);

    const userCredentials = {
      email: this.loginForm.get('email')?.value,
      password: base64Password,
    };

    this._userApi.login(userCredentials).subscribe(
      (res: IUserApiLoginResponse) => {
        // Handle success
        this._snackBar.openSuccessSnackbar(res.message, 'Close');
        this.close();
        this._authService.setToken(res.token);
        this._userApi.updateUserData(res.user);
        this._router.navigate(['/dashboard']);
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
