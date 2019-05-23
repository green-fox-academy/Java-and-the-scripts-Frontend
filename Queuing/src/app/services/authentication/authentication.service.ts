import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { loginData } from 'src/app/models/loginData';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  sendLoginData(loginData: loginData): Observable<User> {
    return this.http.post<User>('http://localhost:3000/login', loginData);
  }

  getUser(loginData: loginData): void {
    this.sendLoginData(loginData).subscribe((user: User) => {
      this.authState.next(user);
    });
  }
}
