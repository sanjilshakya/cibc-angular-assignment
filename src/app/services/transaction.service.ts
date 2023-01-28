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
    // return this.http.get(APICONSTANTS.TRANSACTIONS, params).pipe(
    //   map((res: any) => {
    //     return res.data;
    //   })
    // );
    let transactions: Transaction[] = [{
      "id": "1",
      "date": new Date(),
      "sender": {
        "firstName": "John",
        "lastName": "Smith",
        "dateOfBirth": new Date(),
        "IDNumber": "100001"
      },
      "recipient": {
        "firstName": "Jane",
        "lastName": "doe",
        "email": "janedoe@company.com",
        "accountNumber": "200001",
        "bank": "TD"
      },
      "Amount": 100.00,
      "CurrencyCd": "CAD",
      "Comments": "Utility bill",
      "status": "COMPLETED"
    },
    {
      "id": "2",
      "date": new Date(),
      "sender": {
        "firstName": "John2",
        "lastName": "Smith",
        "dateOfBirth": new Date(),
        "IDNumber": "100001"
      },
      "recipient": {
        "firstName": "Jane2",
        "lastName": "doe",
        "email": "janedoe@company2.com",
        "accountNumber": "200001",
        "bank": "TD"
      },
      "Amount": 100.00,
      "CurrencyCd": "USD",
      "Comments": "Rent",
      "status": "PENDING"
    },
    {
      "id": "3",
      "date": new Date(),
      "sender": {
        "firstName": "John3",
        "lastName": "Smith",
        "dateOfBirth": new Date(),
        "IDNumber": "100001"
      },
      "recipient": {
        "firstName": "Jane3",
        "lastName": "doe",
        "email": "janedoe@company3.com",
        "accountNumber": "200001",
        "bank": "CIBC"
      },
      "Amount": 300.00,
      "CurrencyCd": "USD",
      "Comments": "Insurance Premium",
      "status": "IN PROGRESS"
    },
    {
      "id": "4",
      "date": new Date(),
      "sender": {
        "firstName": "John4",
        "lastName": "Smith",
        "dateOfBirth": new Date(),
        "IDNumber": "100001"
      },
      "recipient": {
        "firstName": "Jane4",
        "lastName": "doe",
        "email": "janedoe@company4.com",
        "accountNumber": "200001",
        "bank": "RBC"
      },
      "Amount": 200.00,
      "CurrencyCd": "CAD",
      "Comments": "Cash Transfer",
      "status": "REJECTED"
    }]
    return of (transactions)
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
    return this.http.put(`${APICONSTANTS.TRANSACTIONS}/${data.id}`, data).pipe(
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
