import { Component, NgModule, OnInit } from '@angular/core';
import { UserService, Project } from './../../services/user/user.service';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  login : string
  projects: Project[]

  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.getUserProjects();
  }

  fetchProjects(login: string) {
  	console.log("Login passed: " + login)
        return this.userService.getUserProjects(login).subscribe(
			projects => {
				this.projects = projects
			},
			err => {
				console.log("Error occured while receiving user projects");
			}
		);
  }

  getUserProjects(){
  	this.fetchProjects(localStorage.getItem("login"))
  }

}
