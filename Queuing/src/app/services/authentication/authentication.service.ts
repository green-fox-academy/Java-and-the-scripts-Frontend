import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { loginData } from 'src/app/models/loginData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
    private router: Router) {}

  sendLoginData(loginData: loginData): Observable<User> {
    return this.http.post<User>('http://localhost:8080/login', loginData);
  }

  getUser(loginData: loginData): void {
    this.sendLoginData(loginData).subscribe((user: User) => {
      this.authState.next(user);
      this.router.navigate(['/home']);
    });
  }
}
