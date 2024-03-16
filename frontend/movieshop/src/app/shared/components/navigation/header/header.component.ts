import { Component, OnInit } from '@angular/core';
//import { User } from 'src/app/core/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 // user:User;

  constructor(private router:Router) { }

  ngOnInit() {
    console.log("component has been initialized!")
  //  this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

 // public logout(){
   // localStorage.setItem('currentUser',null);
    //this.router.navigate(['login']);
 // }
}
