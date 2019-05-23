import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NewQueue } from 'src/app/models/NewQueue';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { QueueService } from 'src/app/services/queue/queue.service';

@Component({
  selector: 'app-select-queue',
  templateUrl: './select-queue.component.html',
  styleUrls: ['./select-queue.component.css']
})
export class SelectQueueComponent implements OnInit {
  date = new Date();
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentTime: string =
    new Date().getHours() +
    ':' +
    new Date().getMinutes() +
    ':' +
    new Date().getSeconds();
  currentDate: string = new Date().toLocaleDateString('en-US', this.options);

  form: FormGroup;
  defaultValueCat = 'Select your service';
  defaultValueDoc = 'Select your doctor';
  categories: string[] = ['administration', 'consultation'];
  selectedCategory: string = '';
  selectedDoctor: string;
  username: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private queueService: QueueService
  ) {}

  ngOnInit() {
    this.displayLiveTime();
    this.form = this.formBuilder.group({
      category: this.selectedCategory
        ? this.selectedCategory
        : this.defaultValueCat,
      doctor: this.selectedDoctor ? this.selectedDoctor : this.defaultValueDoc
    });

    this.form.get('category').valueChanges.subscribe(selectedCat => {
      this.selectedCategory = selectedCat;
    });

    this.authenticationService.authState.subscribe(user => {
      if(user){
        this.username = user.username;
      }
      console.log(this.username);
      console.log(user);
    });
  }

  get category() {
    return this.form.get('category');
  }

  onSelected(inputSelectedDoctor: string): void {
    this.selectedDoctor = inputSelectedDoctor;
  }

  displayLiveTime(): void {
    setInterval(() => {
      this.currentTime =
        new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds();
    }, 1000);
  }

  onSubmit(): void {
    const payload: NewQueue = {
      ...this.form.value,
      username: this.username,
      time: new Date()
    };
    this.submitNewQueue(payload);
  }

  submitNewQueue(payload: NewQueue): void {
    if (payload.category && payload.doctor && payload.username) {
      this.queueService.submitNewQueue(payload).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}
