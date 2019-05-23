import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { loadLContextFromNode } from '@angular/core/src/render3/discovery_utils';
import { RegistrationService } from 'src/app/services/registration/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      password: '',
      email: '',
      doctor: '',
      username: ''
    });
    this.form.valueChanges.subscribe(value => {
      console.log(value);
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

  get() {
    return this.form.get('email');
  }

  onSubmit() {
    this.registrationService
      .sendRegistrationData(this.form.value)
      .subscribe((data) => {
        console.log(data);
      });
    // console.log(this.form.value);
  }
}
