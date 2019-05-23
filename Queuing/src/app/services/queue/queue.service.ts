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

  getQueue(): Observable<Queue> {
    return this.http.get<Queue>('/myqueue');
  }

  submitNewQueue(payload: NewQueue): Observable<NewQueue> {
    return this.http.post<NewQueue>('http://localhost:3000/queue', payload);
  }
}
