import { Component, OnInit } from '@angular/core';

import { UserService } from './../../../services/user/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	constructor(private userService:UserService) { }

	ngOnInit() {
	}

	logIn(login:string, password:string){
		console.log("Attempt to login as '" + login + "'");
		console.log("Password: " + password);
		this.userService.auth(login, password)
		//invoke UserService auth action
		return false;
	}

	isLoggedIn(){
		return false;
	}

}
