import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logged:boolean

  constructor() { }

  ngOnInit() {
  	this.logged = true;
  }

  isLoggedIn(){
  	console.log(this.logged);
  	return this.logged;
  }

}
