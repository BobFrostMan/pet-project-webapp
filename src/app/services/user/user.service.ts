import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpInterceptorService } from './../interceptor/interceptor.service';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class UserService {

	constructor(private http: HttpInterceptorService) {
	}

	getUser(login:string) {
		return this.http.post(environment.apiEndpoint + "getUser", {"login" : login}).map(res => {
			console.log("Server processed /getUser request successfully");
			console.log(res);
			return res;
		}, 

		err => {
			console.log("Error occured!");
			console.log(err.json())
			return err;
		});
	}

	getUserByName(name:string) {
			return this.http.post(environment.apiEndpoint + "getUser", {"name" : name}).map(res => {
				console.log("Server processed /getUser request successfully");
				console.log(res);
				let user:User = JSON.parse(res.text());
				return user;
			}, 

			err => {
				console.log("Error occured!");
				console.log(err.json())
				return err;
			});
	}	

	getUserProjects(login:string){
		return this.http.post(environment.apiEndpoint + "getUserProjects", { "login" : login }).map(
            (res: Response) => {
                console.log("Server processed /getUserProjects request successfully");
                let projects:Project[] = res.json().data;
                console.log(res.json().data);
                return projects;
            }, 
            err => {
                console.log("Error occured!");
                console.log(err.json())
                return err;
            });
	}

	//chained requests example
	getProjectsForUser(name:string){
		return this.http.post(environment.apiEndpoint + "getUser", {"name" : name}).map(
			(res) => {
				console.log("Server processed /getUser request successfully");
				//res.json().data.login;
				console.log(res.json().data[0]);
				console.log(res.json().data[0].login);
				return res.json().data[0].login;
			}).flatMap((login: string) =>
				this.http.post(environment.apiEndpoint + "getUserProjects", { "login" : login }).map(
		            (res: Response) => {
		                console.log("Server processed /getUserProjects request successfully");
		                let projects:Project[] = res.json().data;
		                return projects;
		            }, 
		            err => {
		                console.log("Error occured!");
		                console.log(err.json())
		                return err;
		            })
			)

	}

	hasToken(req):boolean {
		return req.headers.has('token');
	}

}

export interface Project {
	issue_fields_name: string;
	name: string;
	workflow_name: string;
	participants : string[];
}

export interface User {
	login: string;
	name: string;
	projects: string[]
}
