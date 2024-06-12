import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menu-partner',
  templateUrl: './menu-partner.component.html',
  styleUrls: ['./menu-partner.component.scss'],
})
export class MenuPartnerComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateTo(path: string) {
    this.router.navigate([`/menu-partner/${path}`]);
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }


  logOut() {
    // Clear all local storage variables
    localStorage.clear();
    console.log('User logged out, local storage cleared');
    // Redirect to the login page
    this.router.navigate(['/']);
  }

}
