import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Headers, RequestOptions } from '@angular/http';
import { HttpInterceptorService } from './../interceptor/interceptor.service';

@Injectable()
export class UserService {

	constructor(private http: HttpInterceptorService) {
	}

	getUser(login:string) {
		return this.http.post(environment.apiEndpoint + "getUser", {"login" : login}).map(res => {
			console.log("Server processed request successfully");
			console.log(res);
			return res;
		}, 

		err => {
			console.log("Error occured!");
			console.log(err.json())
			return err;
		});
	}

	hasToken(req):boolean {
		return req.headers.has('token');
	}


}


