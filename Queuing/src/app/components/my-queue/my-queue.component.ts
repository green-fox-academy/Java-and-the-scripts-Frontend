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
    remaining_time: '10:30'
  };
  remain: string = this.queue.remaining_time;
  username: string;

  constructor(
    private queueService: QueueService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.displayLiveTime();
    const allMinutes = 60 * Number(this.queue.remaining_time.split(':')[1]);
    this.displayRemainingTime(allMinutes);
    this.authenticationService.authState.subscribe(user => {
      if (user) {
        this.username = user.username;
      }
    });
    if (this.username){
      this.getMyQueue(this.username);
      console.log(this.username);
    }
  }

  getMyQueue(username): void {
    this.queueService.getQueue(username).subscribe(queue => {
      // this.queue = queue;
      // console.log(queue);
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
    let minutes: number | string;
    let seconds: number | string;
    setInterval(() => {
      minutes = parseInt((timer / 60).toString(), 10);
      seconds = parseInt((timer % 60).toString(), 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      this.remain = minutes + ':' + seconds;

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }
}
