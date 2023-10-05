import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent {
  @Input() isAuthenticated: boolean = false;
  @Input() username: string = '';
  @Output() loginRequested = new EventEmitter<void>();
  @Output() logoutRequested = new EventEmitter<void>();
  constructor(private dialog: MatDialog) {}

  openLoginDialog() {
    this.loginRequested.emit();
  }

  openSignupDialog() {
    this.dialog.open(SignupDialogComponent, {
      width: '30%',
    });
  }

  logout() {
    this.logoutRequested.emit();
  }
}
