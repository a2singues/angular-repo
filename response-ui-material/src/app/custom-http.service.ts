import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomHttpService {

  constructor(private httpClient: HttpClient) { }

  getSingle<T>(id: number) {
    return this.httpClient.get<T>(`http://replace.with.api/anything/${id}`);
  }

  postData<T>(item: any) {
    return this.httpClient.post<T>(`http://replace.with.api/anything`, item);
  }

  putData<T>(id: number, item: any) {
    return this.httpClient.put<T>(`http://replace.with.api/anything/${id}`, item);
  }

  deleteData(id: number) {
    return this.httpClient.delete(`http://replace.with.api/anything/${id}`);
  }
}