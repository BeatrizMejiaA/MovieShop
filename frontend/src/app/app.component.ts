import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  verifyLogin(){
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });
    //this.isLoggedIn  = !!localStorage.getItem('usertoken');
  }

  async goToMovies() {
    await this.router.navigate(['/movies']);
    this.verifyLogin();
  }

  async goToAbout() {

    await this.router.navigate(['/about']);
    this.verifyLogin();
  }

  async goToPartner() {
    await this.verifyLogin();
    await this.router.navigate(['/partner']);
  }

  async goToLogin() {

    await this.router.navigate(['/login-selection']);
    this.verifyLogin();
  }

  async goToSignUp() {

    await this.router.navigate(['/signup']);
    this.verifyLogin();
  }

  async navigateToPurchasedItems() {

    await this.router.navigate(['/purchased-items']);
    this.verifyLogin();
  }

  async navigateToUserOrders() {

    await this.router.navigate(['/user-orders']);
    await this.verifyLogin();
  }

  async logout() {
    await localStorage.removeItem('usertoken');
    await localStorage.removeItem('useremail');

    await this.authService.logout();
    await this.router.navigate(['/']);

  }

}

