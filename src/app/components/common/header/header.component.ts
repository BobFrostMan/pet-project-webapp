import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './../../../services/auth/auth.service';
import { AlertService } from './../../../services/alert/alert.service';
import { UserService } from './../../../services/user/user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService, 
		private alertService: AlertService,
		private userService:UserService
		) { }

	ngOnInit() {
		let username:string = "Logged in"

		username = this.getUserName(localStorage.getItem('login'));
		console.log("Username: " + username);

		//get username from local storage
	}

	editProfile(){
		//TODO: implement
	}

	logout(){
		this.authenticationService.logout();
		this.router.navigate(['login']);
	}

	getUserName(login:string){
		this.userService.getUser(login).subscribe(
			data => {
				let userData = data.json();
				if (userData != null && userData.data.name != null){
					console.log("Received user data:" + userData);
					localStorage.setItem("user", userData.data);
					return userData.data.name;
				}
			},
			err => {
				console.log("Error occured receiveing user");
				localStorage.setItem("user", JSON.stringify('{}'));
			});
		return "Logged in";
	}

}
