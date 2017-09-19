import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

	//private http: HttpClient;

	constructor(private http: Http) {
	}

	//returns token value on successfull authorisation, else return error
	auth(login:string, pass:string):any{
		let payload = { 
			"login" : login,
			"pass" : pass
		}

		let response = null

		return this.http.post(environment.apiEndpoint + "auth", payload).map(
			res => {
				console.log("Server processed request successfully");
				console.log(res);
				return res;

				// let authResp:AuthResponse = Object.assign(new AuthResponse(), JSON.parse(res, (status, data) => {
  		// 				console.log(data); // log the current property name, the last is "".
  		// 				return data;     // return the unchanged property value.
  		// 			}));
				// console.log(authResp.value);
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

export class AuthResponse{
	status: number;
	data:RespData;
}

export class RespData{
	expiration:string;
	value:string;
}

