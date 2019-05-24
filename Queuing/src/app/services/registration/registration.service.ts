import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { regData } from 'src/app/models/registrationData';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  sendRegistrationData(regData: regData):any {
    return this.http.post('https://hidden-peak-85695.herokuapp.com/register', regData);
  }
}
