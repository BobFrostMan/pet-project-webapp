import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';

import { LoginComponent } from './components/common/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	
  //userService:UserService;
  logged:boolean;

  constructor(userService:UserService){
    //this.userService = userService;
  }

  ngOnInit() {
    this.logged = false;
  }

  isLoggedIn():boolean {
    return this.logged;
  }

}