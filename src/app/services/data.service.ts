import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DataService {
    private subject = new Subject<any>();

    sendData(message: any) {
        this.subject.next(message);
    }

    getData(): Observable<any> {
        return this.subject.asObservable();
    }
}