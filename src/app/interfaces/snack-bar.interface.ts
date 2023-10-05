import { MatSnackBar } from "@angular/material/snack-bar";

export interface snackBarData{
    message: string;
    action: string;
    icon: string;
    snackbar: MatSnackBar
}