import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { IBook, IGetBooksApiResponse } from 'src/app/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BooksApiService } from 'src/app/services/books-api/books-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserApiService } from 'src/app/services/users-api/users-api.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class BooksTableComponent {
  columnsToDisplay = ['Title', 'Author', 'Publisher', 'Price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: IBook | null | undefined;
  dataSource = new MatTableDataSource<IBook>();
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private _booksApiService: BooksApiService,
    private _userApiService: UserApiService,
    private _authService: AuthenticationService,
    private _router: Router,
    public _snackBar: SnackBarService
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.fetchBooks();
    }
  }

  fetchBooks() {
    const offset = this.pageIndex * this.pageSize;
    const pageSize = this.pageSize;

    this._booksApiService.getBooks(pageSize, offset).subscribe(
      (res: IGetBooksApiResponse) => {
        this.dataSource.data = res.books;
      },
      (err: HttpErrorResponse) => {
        if (err.statusText === 'Unauthorized') {
          this._userApiService.clearUserData();
          this._authService.logout();
          this._snackBar.openErrorSnackbar(
            'Session Expired. Login again !',
            'Okay'
          );
          this._router.navigate(['/homepage']);
        }
      }
    );
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchBooks();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
