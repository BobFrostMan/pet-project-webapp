import { Component, OnInit } from '@angular/core';

import { UserService } from './../../../services/user/user.service';
import { AppComponent } from './../../../app.component';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	constructor(private appComponent:AppComponent, private userService:UserService) { }

	ngOnInit() {
	}

	// logIn(login:string, password:string){
	// 	console.log("Attempt to login as '" + login + "'");
	// 	console.log("Password: " + password);
	// 	let token = this.userService.auth(login, password)
	
	// 	this.appComponent.logged = token == null ? false: true;
	// 	//return false;
	// }

	// isLoggedIn(){
	// 	return false;
	// }

}
