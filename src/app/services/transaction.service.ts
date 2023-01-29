import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { APICONSTANTS } from '../constants';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';

const API_BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpService) { }

  getAll(params?:any) {
    return this.http.get(APICONSTANTS.TRANSACTIONS, params).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getById(id: any) {
    return this.http.get(`${APICONSTANTS.TRANSACTIONS}/${id}`).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  create(data: any) {
    return this.http.post(APICONSTANTS.TRANSACTIONS, data).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  update(data: any) {
    return this.http.put(`${APICONSTANTS.TRANSACTIONS}/${data._id}`, data).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  delete(id: any) {
    return this.http.delete(`${APICONSTANTS.TRANSACTIONS}/${id}`).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
}
