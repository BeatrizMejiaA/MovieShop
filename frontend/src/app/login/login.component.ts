import { Component,OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    // Initialization logic here
  }

  login() {
    // Replace this with your actual login endpoint
    const apiUrl = 'https://q0d4hzkoei.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/users/login';
    this.http.post<any>(apiUrl, { id: this.email, password: this.password })
      .subscribe(
        response => {
          // Assuming the API returns a token upon successful login
          const token = response.login;
          if (token) {
            // Store the token in local storage or session storage
            localStorage.setItem('token', token);
            console.log(token);
            // Redirect to the home page or any other protected route
            this.router.navigate(['/vendors']);
          } else {
            this.errorMessage = 'Invalid credentials';
          }
        },
        error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid credentials';
        }
      );
  }
}
