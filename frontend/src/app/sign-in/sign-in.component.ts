import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInData: any = {
    id: '',
    name: '',
    middleName: '',
    lastName: '',
    mobile: '',
    city: '',
    state: '',
    zipCode: '',
    address1: '',
    birthDate: '',
    photo: '',
    password: '',
    repeatpass: '',
  };
  errorMessage: string = ''; // Error message to display

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  signIn() {
    console.log('Sign-in data:', this.signInData);

    // API request
    this.http
      .post<any>(
        'https://q0d4hzkoei.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/users',
        this.signInData
      )
      .subscribe(
        (response) => {
          console.log('API Response:', response);
          // Redirect to home upon successful sign-in
          this.router.navigate(['/login']);
          // Clear the sign-in data
          this.signInData = {
            id: '',
            name: '',
            middleName: '',
            lastName: '',
            mobile: '',
            city: '',
            state: '',
            zipCode: '',
            address1: '',
            birthDate: '',
            photo: '',
            password: '',
            repeatpass: '',
          };
        },
        (error) => {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      );
  }
}
