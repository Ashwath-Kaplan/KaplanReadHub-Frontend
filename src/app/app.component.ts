import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserApiService } from './services/users/users-api.service';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { SnackBarService } from './services/snack-bar/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserApiResponse } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'KaplanReadHub-Frontend';
  isAuthenticated: boolean = false;
  username: string = '';
  email: string = '';

  constructor(
    private _dialog: MatDialog,
    private _userApiService: UserApiService,
    public _snackBar: SnackBarService
  ) {
    this._userApiService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
    this._userApiService.username$.subscribe((username) => {
      this.username = username;
    });
    this._userApiService.email$.subscribe((email) => {
      this.email = email;
    });
  }

  openLoginDialog() {
    this._dialog.open(LoginDialogComponent, {
      width: '30%',
    });
  }

  logout() {
    this._userApiService.logout({ email: this.email }).subscribe(
      (res: UserApiResponse) => {
        // Handle success
        this._userApiService.onSuccessfulLogout();
        this._snackBar.openSuccessSnackbar(res.message, 'Okay');
      },
      (err: HttpErrorResponse) => {
        if (err.status === 0) {
          // Network error
          this._snackBar.openErrorSnackbar('Network Error', 'Okay');
        } else {
          // Handle error
          this._snackBar.openErrorSnackbar(err.error.message, 'Okay');
        }
      }
    );
  }
}
