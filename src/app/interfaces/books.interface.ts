export interface IBook {
  BookID: number;
  Title: string;
  Author: string;
  Publisher: string;
  Description: string;
  Price: string;
}

export interface IGetBooksApiResponse {
  success: string;
  books: IBook[];
}
