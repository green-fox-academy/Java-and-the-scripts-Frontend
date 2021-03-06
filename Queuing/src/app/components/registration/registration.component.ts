import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { loadLContextFromNode } from '@angular/core/src/render3/discovery_utils';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { Router } from '@angular/router';
import { regData } from 'src/app/models/registrationData';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;
  successMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      password: '',
      email: '',
      role: '',
      username: ''
    });
  }

  get name() {
    return this.form.get('name');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }

  onSubmit() {
    const payload: regData = {
      username: this.form.get('username').value,
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      role: ''
    };
    if (this.form.get('role').value == true) {
      payload.role = 'admin';
    } else if (this.form.get('role').value == false) {
      payload.role = 'user';
    }
    this.registrationService.sendRegistrationData(payload).subscribe(result => {
      if (result.error) {
        this.errorMessage = result.error;
      } else {
        this.successMessage = 'Successful registration!';
        this.deleteValues();
      }
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    });
  }
  deleteValues() {
    this.form.get('name').setValue('');
    this.form.get('username').setValue('');
    this.form.get('password').setValue('');
    this.form.get('email').setValue('');
  }
}
