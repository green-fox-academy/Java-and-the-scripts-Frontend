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
  constructor(private authService: AuthenticationService) {}
  
  ngOnInit() {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${localStorage.getItem('authToken')}`)
    });
    return next.handle(request);
  }
}
