import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { APICONSTANTS } from '../constants';
import { HttpClient } from '@angular/common/http';

const API_BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends HttpService {

  API_BASE_URL = environment.apiURL;

  constructor(http: HttpClient) {
    super(`${API_BASE_URL}${APICONSTANTS.TRANSACTIONS}`, http)
  }
}
