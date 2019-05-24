import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationConfigInterceptor implements HttpInterceptor, OnInit {
  user;

  constructor(private authService: AuthenticationService){
  }
  
ngOnInit(){
this.authService.authState.subscribe((user)=> {
  if (user){
    this.user = user;
  }
})
}

  authToken = localStorage.getItem('authToken');

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
    }
    return next.handle(request);
  }
}
