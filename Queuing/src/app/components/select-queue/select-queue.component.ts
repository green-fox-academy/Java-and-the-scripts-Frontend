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
      this.username = user.username;
    });
  }

  get category() {
    return this.form.get('category');
  }

  onSelected(inputSelectedDoctor: string): void {
    this.selectedDoctor = inputSelectedDoctor;
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
