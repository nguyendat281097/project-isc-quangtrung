import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { Librarian } from '../models/librarian';
import { ApiService } from './api.service';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LibrarianService {

  constructor(private apiService: ApiService) { }

  // get all
  list(): Observable<RootObj<[Librarian]>> {
    return this.apiService.get<RootObj<[Librarian]>>(this.apiService.apiUrl.librarians.home);
  }
  get(id): Observable<RootObj<Librarian>> {
    return this.apiService.get<RootObj<Librarian>>(`${this.apiService.apiUrl.librarians.home}/${id}`);
  }
  delete(id): Observable<RootObj<Librarian>> {
    return this.apiService.delete<RootObj<Librarian>>(`${this.apiService.apiUrl.librarians.home}/${id}`);
  }
  save(data: Librarian): Observable<RootObj<Librarian>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<Librarian>>(this.apiService.apiUrl.librarians.home, data);
    } else {
      return this.apiService.put<RootObj<Librarian>>(`${this.apiService.apiUrl.librarians.home}/${data.id}`, data);
    }
  }
  login(userName: string, password: string): Observable<RootObj<Login>> {
    const data = {
      userName: userName,
      password: password,
    };
    return this.apiService.post<RootObj<Login>>(this.apiService.apiUrl.librarians.login, data);
  }
}
