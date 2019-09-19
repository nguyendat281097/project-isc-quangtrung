import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { BookTitle } from '../models/book-title';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class BookTitleService {
  constructor(private apiService: ApiService) { }

  // get all
  list(page: Page): Observable<RootObj<[BookTitle]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObj<[BookTitle]>>(`${this.apiService.apiUrl.bookTitles}?${queryString}`);
  }
  get(id): Observable<RootObj<BookTitle>> {
    return this.apiService.get<RootObj<BookTitle>>(`${this.apiService.apiUrl.bookTitles}/${id}`);
  }
  delete(id): Observable<RootObj<BookTitle>> {
    return this.apiService.delete<RootObj<BookTitle>>(`${this.apiService.apiUrl.bookTitles}/${id}`);
  }
  save(data: BookTitle): Observable<RootObj<BookTitle>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<BookTitle>>(this.apiService.apiUrl.bookTitles, data);
    } else {
      return this.apiService.put<RootObj<BookTitle>>(`${this.apiService.apiUrl.bookTitles}/${data.id}`, data);
    }
  }
}
