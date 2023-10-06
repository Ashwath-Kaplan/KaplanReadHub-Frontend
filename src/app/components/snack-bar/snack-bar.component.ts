import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ISnackBarData } from 'src/app/interfaces';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public snackBarData: ISnackBarData) {}

  closeSnackbar() {
    this.snackBarData.snackbar.dismiss();
  }
}
