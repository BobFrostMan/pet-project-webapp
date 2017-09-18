import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	logged:boolean

  ngOnInit() {
  	this.logged = true;
  }

  isLoggedIn(){
  	return this.logged;
  }
}
