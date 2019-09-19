import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
   }
  baseUrl = 'http://localhost:8081/';
  apiUrl = {
    librarians: {
      home: `${this.baseUrl}librarians`,
      login: `${this.baseUrl}librarians/login`
    },
    authors: `${this.baseUrl}authors`,
    subjects: `${this.baseUrl}subjects`,
    bookTitles: `${this.baseUrl}bookTitles`,
    books: `${this.baseUrl}books`,
    readerTypes: `${this.baseUrl}readerTypes`,
    readers: `${this.baseUrl}readers`,
    loanSlipPays: `${this.baseUrl}loanSlipPays`,
    loanSlipPayInfos: `${this.baseUrl}loanSlipPayInfos`,
  };
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
  put<T>(url: string, data: Object): Observable<T> {
    return this.http.put<T>(url, data);
  }
  post<T>(url: string, data: Object): Observable<T> {
    return this.http.post<T>(url, data);
  }
}
