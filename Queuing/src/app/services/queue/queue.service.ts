import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Queue } from '../../models/Queue';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) { }

  getQueue(): Observable<Queue> {
    return this.http.get<Queue>('/myqueue');
  }
}
