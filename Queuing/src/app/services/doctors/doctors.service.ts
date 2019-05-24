import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { doctor } from 'src/app/models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  constructor(private http: HttpClient) {}

  getDoctors(): Observable<doctor[]> {
    return this.http.get<doctor[]>('http://localhost:8080/doctors');
  }
}
