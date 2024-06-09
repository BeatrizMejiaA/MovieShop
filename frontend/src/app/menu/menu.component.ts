import { Component, ChangeDetectorRef, OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;
  constructor(private router: Router,private authService: AuthService,private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.isLoggedIn  = !!localStorage.getItem('usertoken');
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    // Additional setup logic if needed
    this.cdr.detectChanges();
  }

  verifyLogin(){
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });
    //this.isLoggedIn  = !!localStorage.getItem('usertoken');
    this.cdr.detectChanges(); // Manually trigger change detection
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
   this.cdr.detectChanges(); // Manually trigger change detection

  }
}
