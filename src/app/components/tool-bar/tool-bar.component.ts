import { Component } from '@angular/core';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { IGetUserApiResponse, IUserApiResponse } from 'src/app/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { UserApiService } from 'src/app/services/users-api/users-api.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent {
  isAuthenticated = this._authService.isAuthenticated();
  userName = '';
  email = '';

  constructor(
    private _dialog: MatDialog,
    private _userApiService: UserApiService,
    public _snackBar: SnackBarService,
    private _router: Router,
    private _authService: AuthenticationService
  ) {}

  ngOnInit() {
    if (this.isAuthenticated) {
      this._userApiService.getUser().subscribe(
        (response: IGetUserApiResponse) => {
          this.email = response.user.email;
          this.userName =
            response.user.firstName + ' ' + response.user.lastName;
        },
        (error: HttpErrorResponse) => {
          console.log('getuser', error);
          if (error.statusText === 'Unauthorized') {
            this._userApiService.clearUserData();
            this.isAuthenticated = false;
            this.userName = '';
            this.email = '';
            this._snackBar.openErrorSnackbar(
              'Session Expired. Login again !',
              'Okay'
            );
            this._authService.logout();
            this._router.navigate(['/homepage']);
          }
        }
      );
    } else {
      this._userApiService.userData$.subscribe((userData) => {
        if (userData) {
          this.email = userData.email;
          this.userName = userData.firstName + ' ' + userData.lastName;
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
          this.userName = '';
          this.email = '';
        }
      });
    }
  }

  openSignupDialog() {
    this._dialog.open(SignupDialogComponent, {
      width: '30%',
    });
  }

  openLoginDialog() {
    this._dialog.open(LoginDialogComponent, {
      width: '30%',
    });
  }

  logout() {
    this._userApiService.logout({ email: this.email }).subscribe(
      (response: IUserApiResponse) => {
        this._userApiService.clearUserData();
        this.isAuthenticated = false;
        this.userName = '';
        this.email = '';
        this._snackBar.openSuccessSnackbar(response.message, 'Okay');
        this._authService.logout();
        this._router.navigate(['/homepage']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 0) {
          // Network error
          this._snackBar.openErrorSnackbar('Network Error', 'Okay');
        } else if (error.statusText === 'Unauthorized') {
          this._userApiService.clearUserData();
          this._authService.logout();
          this._snackBar.openErrorSnackbar(
            'Session Expired. Login again !',
            'Okay'
          );
          this._router.navigate(['/homepage']);
        } else {
          // Handle error
          this._snackBar.openErrorSnackbar(error.error.message, 'Okay');
        }
      }
    );
  }
}
