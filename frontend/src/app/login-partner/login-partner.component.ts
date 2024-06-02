import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-partner',
  templateUrl: './login-partner.component.html',
  styleUrls: ['./login-partner.component.scss'],
})
export class LoginPartnerComponent implements OnInit {
  //email: string = '';
  email: string = 'lmejia@gmail.com';
  password: string = '123';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}
  login() {
    // Replace this with your actual login endpoint
    const apiUrl =
      'https://2wskjly0pd.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/merchants/login';
    this.http
      .post<any>(apiUrl, { id: this.email, password: this.password })
      .subscribe(
        (response) => {
          // Assuming the API returns a token upon successful login
          const token = response.token;
          if (token) {
            // Store the token in local storage or session storage
            localStorage.setItem('token', token);
            localStorage.setItem('email', this.email);
            console.log(token);
            // Redirect to the home page or any other protected route
            this.router.navigate(['/menu-partner/add-products']);
          } else {
            this.errorMessage = 'Invalid credentials';
          }
        },
        (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid credentials';
        }
      );
  }
}
