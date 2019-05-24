import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  username: string;
  date = new Date();
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentTime: string =
    new Date().getHours() +
    ':' +
    new Date().getMinutes() +
    ':' +
    new Date().getSeconds();
  currentDate: string = new Date().toLocaleDateString('en-US', this.options);

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.displayLiveTime();
    this.authenticationService.authState.subscribe(user => {
      if (user) {
        this.username = user.username;
      }
      console.log(user);
    });
  }

  goToQueue() {
    this.router.navigate(['/queue']);
  }

  goToMyQueue() {
    this.router.navigate(['/myqueue']);
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

  logOut() {
    this.router.navigate(['/']);
    localStorage.removeItem('authToken');
    this.authenticationService.authState.next(null);
  }
}
