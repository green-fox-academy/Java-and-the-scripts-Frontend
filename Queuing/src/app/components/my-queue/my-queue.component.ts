import { Component, OnInit } from '@angular/core';
import { QueueService } from 'src/app/services/queue.service';
import { Queue } from 'src/app/models/Queue';

@Component({
  selector: 'app-my-queue',
  templateUrl: './my-queue.component.html',
  styleUrls: ['./my-queue.component.css']
})
export class MyQueueComponent implements OnInit {
  date = new Date();
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentTime: String = new Date().getHours() + ":" 
  + new Date().getMinutes() + ":" + new Date().getSeconds();
  currentDate: String = new Date().toLocaleDateString("en-US", this.options);
  hasQueue: boolean = true;
  queue: Queue = {
    id: 12569,
	doctor: "Doctor Ulmer",
	address: "Budapest, Andrássy út",
	in_line: 8,
	remaining_time: "1:30:00",
  }

  constructor(private queueService: QueueService) { }

  ngOnInit() {
    this.displayLiveTime();
  }

  getMyQueue():void {
    this.queueService.getQueue().subscribe(queue => {
      // this.queue = queue;
    });
  }

  displayLiveTime () {
    setInterval(() => {
      this.currentTime = new Date().getHours() + ":" 
      + new Date().getMinutes() + ":" + new Date().getSeconds();
    }, 1000);
  }

  

}
