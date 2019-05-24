import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { doctor } from 'src/app/models/doctor';
import { DoctorsService } from 'src/app/services/doctors/doctors.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-doctor-selector',
  templateUrl: './doctor-selector.component.html',
  styleUrls: ['./doctor-selector.component.css']
})
export class DoctorSelectorComponent implements OnInit {
  form: FormGroup;
  defaultValue = 'Choose your doctor';
  doctors: doctor[] = [];
  @Output() selectedDoc = new EventEmitter<string>();
  username: string;

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorsService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.authState.subscribe(user => {
      if (user) {
        this.username = user.username;
      }
    });
    this.form = this.formBuilder.group({
      doctor: this.selectedDoc ? this.selectedDoc : this.defaultValue
    });
    this.doctorService.getDoctors().subscribe((doctors: doctor[]) => {
      this.doctors = doctors;
    });
    this.form.get('doctor').valueChanges.subscribe(selectedDoc => {
      this.selectedDoc.emit(selectedDoc);
    });
  }

  get doctor() {
    return this.form.get('doctor');
  }
}
