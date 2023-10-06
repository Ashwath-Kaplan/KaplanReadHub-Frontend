import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserApiService } from 'src/app/services/users/users-api.service';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { IUserApiLoginResponse } from 'src/app/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginDialogComponent {
  @Output() loginSuccess = new EventEmitter<IUserApiLoginResponse['user']>();
  passwordVisibilty = false;

  constructor(
    public _dialogRef: MatDialogRef<LoginDialogComponent>,
    private _userApi: UserApiService,
    public _snackBar: SnackBarService
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
    this.markFormGroupTouched(this.loginForm);

    if (this.loginForm.valid) {
      const userCredentials = this.loginForm.value;
      this._userApi.login(userCredentials).subscribe(
        (response: IUserApiLoginResponse) => {
          // Handle success
          this._snackBar.openSuccessSnackbar(response.message, 'Close');
          this._userApi.onSuccessfulLogin(response.user);
          this.close();
          this.loginSuccess.emit(response.user);
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
  }

  close() {
    this._dialogRef.close();
  }
}
