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

  getQueue(username): any {
    return this.http.get(`http://localhost:8080/myqueue/${username}`);
  }

  submitNewQueue(payload: NewQueue): Observable<NewQueue> {
    return this.http.post<NewQueue>('http://localhost:8080/queue', payload);
  }
}
