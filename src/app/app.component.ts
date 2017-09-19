import { Component } from '@angular/core';
import { UserService, AuthResponse } from './services/user/user.service';

//import { LoginComponent } from './components/common/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	
  //userService:UserService;
  logged:boolean;

  constructor(private userService:UserService){
    //this.userService = userService;
  }

  ngOnInit() {
    this.logged = true;
  }

  isLoggedIn():boolean {
    return this.logged;
  }

  logIn(login:string, password:string){
    console.log("Attempt to login as '" + login + "'");
    console.log("Password: " + password);
    let token = null;
    this.userService.auth(login, password).subscribe(res=> {
          let resp = Object.assign(new AuthResponse(), JSON.parse(res.text()));
          console.log(resp);
          console.log(resp.data);
          token = resp.data.value;
          this.logged = token != null;
          console.log(token);
        }
    );
    return false;
  }

}