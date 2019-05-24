import { Component, OnInit } from '@angular/core';
import { QueueService } from 'src/app/services/queue/queue.service';
import { Queue } from 'src/app/models/Queue';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-my-queue',
  templateUrl: './my-queue.component.html',
  styleUrls: ['./my-queue.component.css']
})
export class MyQueueComponent implements OnInit {
  date = new Date();
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentTime: string =
    new Date().getHours() +
    ':' +
    new Date().getMinutes() +
    ':' +
    new Date().getSeconds();
  currentDate: string = new Date().toLocaleDateString('en-US', this.options);
  hasQueue = true;
  queue: Queue = {
    id: 12569,
    doctor: 'Doctor Ulmer',
    address: 'Budapest, Andrássy út',
    in_line: 8,
    remaining_time: '1:30:0'
  };
  remain: string = this.queue.remaining_time;
  convertedRemainingTime: number;
  username: string;

  constructor(
    private queueService: QueueService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.displayLiveTime();
    this.convertedRemainingTime = this.convertRemainingTime();
    this.displayRemainingTime(this.convertedRemainingTime);
    this.authenticationService.authState.subscribe(user => {
      if (user) {
        this.username = user.username;
      }
    });
  }

  convertRemainingTime () {
    let remainingTimeInArray = this.queue.remaining_time.split(':');
    let duration: number = 0;
    let hour: number = Number(remainingTimeInArray[0]);
    let minutes: number = Number(remainingTimeInArray[1]);
    if (hour !== 0) {
      duration += hour * 60 * 60;
    }
    if (minutes !== 0) {
      duration += minutes * 60;
    }
    return duration;
  }

  getMyQueue(): void {
    this.queueService.getQueue().subscribe(queue => {
      // this.queue = queue;
    });
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

  displayRemainingTime(duration): any {
    let timer: number = duration;
    let hours: number | string;
    let minutes: number | string;
    let seconds: number | string;
    setInterval(() => {
      hours = parseInt((timer / 3600).toString(), 10);
      minutes = parseInt(((timer - (hours * 3600)) / 60).toString(), 10);
      seconds = parseInt((timer % 60).toString(), 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      this.remain = hours + ':' + minutes + ':' + seconds;

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }
}
