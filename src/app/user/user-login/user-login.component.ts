import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router, private alert: AlertifyService) { }

  ngOnInit(): void {
  }
  onLogin(loginFrm: NgForm){
    console.log(loginFrm.value);
    const token = this.authService.authUser(loginFrm.value);
    if(token.length > 0){
      localStorage.setItem('token', token[0].userName);
      this.alert.success('Login Successful');
      this.route.navigate(['/']);
    }
    else{
      this.alert.success('Login not Successful')
    }
  }
}
