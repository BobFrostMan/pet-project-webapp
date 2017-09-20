import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';

import { AuthenticationService } from './../../../services/auth/auth.service';
import { AlertService } from './../../../services/alert/alert.service';
import { UserService } from './../../../services/user/user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	greeting:string

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService, 
		private alertService: AlertService,
		private userService:UserService) {
	
	}

	ngOnInit() {

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
					console.log("Username: " + userData.data.name);
					return userData.data.name;
				}
			},
			err => {
				console.log("Error occured receiveing user");
				localStorage.setItem("user", JSON.stringify('{}'));
			});
		return null;
	}


	getHeaderGreeting()	:string {
		let name = localStorage.getItem('username');
		return name == null ? "Logged in" : "Logged as: " + name;
	}

}
