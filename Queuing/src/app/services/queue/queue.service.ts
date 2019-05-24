import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Queue } from '../../models/Queue';
import { NewQueue } from 'src/app/models/NewQueue';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) { }

  getQueue(): any {
    return this.http.get(`https://hidden-peak-85695.herokuapp.com/myqueue`);
  }

  submitNewQueue(payload: NewQueue): Observable<NewQueue> {
    return this.http.post<NewQueue>('https://hidden-peak-85695.herokuapp.com/queue', payload);
  }
}
