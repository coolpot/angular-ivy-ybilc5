import { Component, OnInit } from '@angular/core';
import { User } from '../api.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}
  user: User;
  ngOnInit() {
    this.user = this.authService.userValue;
    console.log(this.user);
  }
}
