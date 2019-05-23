import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { loginData } from 'src/app/models/loginData';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
    this.authService.authState.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  get username(){
    return this.form.get('username');
  }

  get password(){
    return this.form.get('password');
  }
  
  onSubmit(payload: loginData) {
    payload = this.form.value;
    this.authService.getUser(payload);
  }
}
