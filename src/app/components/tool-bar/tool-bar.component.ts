import { Component } from '@angular/core';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent {
  constructor(private dialog: MatDialog) {}

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  openSignupDialog() {
    this.dialog.open(SignupDialogComponent);
  }
}
