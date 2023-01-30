import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(@Inject(String) private url: string, private http: HttpClient) { }

  getAll(params?: any) {
    return this.http.get(this.url, { params })
      .pipe(map((response: any) => response.data))
  }

  getById(id: string) {
    return this.http.get(this.url + '/' + id)
      .pipe(map((response: any) => response.data))
  }

  create(data: any) {
    return this.http.post(this.url, data)
      .pipe(map((response: any) => response.data))
  }

  update(data: any) {
    return this.http.put(this.url + '/' + data._id, data)
      .pipe(map((response: any) => response.data))
  }

  delete(id: any) {
    return this.http.delete(this.url + '/' + id)
      .pipe(map((response: any) => response.data))
  }

}
