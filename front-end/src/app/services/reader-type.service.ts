import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { ReaderType } from '../models/reader-type';

@Injectable({
  providedIn: 'root'
})
export class ReaderTypeservice {
  constructor(private apiService: ApiService) { }

  // get all
  list(): Observable<RootObj<[ReaderType]>> {
    return this.apiService.get<RootObj<[ReaderType]>>(this.apiService.apiUrl.readerTypes);
  }
  get(id): Observable<RootObj<ReaderType>> {
    return this.apiService.get<RootObj<ReaderType>>(`${this.apiService.apiUrl.readerTypes}/${id}`);
  }
  delete(id): Observable<RootObj<ReaderType>> {
    return this.apiService.delete<RootObj<ReaderType>>(`${this.apiService.apiUrl.readerTypes}/${id}`);
  }
  post(data: ReaderType): Observable<RootObj<ReaderType>> {
    return this.apiService.post<RootObj<ReaderType>>(this.apiService.apiUrl.readerTypes, data);
  }
  put(data: ReaderType): Observable<RootObj<ReaderType>> {
    return this.apiService.put<RootObj<ReaderType>>(`${this.apiService.apiUrl.readerTypes}/${data.id}`, data);
  }
}
