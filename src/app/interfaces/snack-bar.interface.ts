import { MatSnackBar } from '@angular/material/snack-bar';

export interface ISnackBarData {
  message: string;
  action: string;
  icon: string;
  snackbar: MatSnackBar;
  class: string;
}
