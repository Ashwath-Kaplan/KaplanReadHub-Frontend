import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    public _snackBar: SnackBarService
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  login() {
    
  }

  close() {
    this.dialogRef.close();
  }
}
