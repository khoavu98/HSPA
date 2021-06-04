import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loginUser: string = '';
  constructor(private alert: AlertifyService) { }

  ngOnInit() {
  }

  loggedin(){
    this.loginUser = localStorage.getItem('token') || '';
    return this.loginUser;
  }

  onLogout(){
    localStorage.removeItem('token');
    this.alert.success("You are Logout");
  }
}
