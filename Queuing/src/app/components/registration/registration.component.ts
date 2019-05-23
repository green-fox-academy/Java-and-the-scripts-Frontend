import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { loadLContextFromNode } from '@angular/core/src/render3/discovery_utils';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      password: '',
      email: '',
      doctor: ''
    });
    this.form.valueChanges.subscribe((value)=>{
console.log(value);

    })
  }

  get name() {
    return this.form.get('name');
  }

  get password() {
    return this.form.get('password');
  }

  get() {
    return this.form.get('email');
  }

  onSubmit(){
    console.log(this.form.value);
    
  }
}
