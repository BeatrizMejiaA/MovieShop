import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class Tab1Page {
  autocomplete: { input: string };
  movies: any[] = [];
  rows: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // Initialize autocomplete if needed
    this.autocomplete = { input: '' };
  }
  goToLogin() {
    this.router.navigate(['/login-selection']);
  }
  goToSignUp() {
    this.router.navigate(['/signup']);
  }
  goToPartner() {
    this.router.navigate(['/partner']);
  }

  searchMovie() {
    const apiUrl =
      'https://p8lh5fvcdi.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/visualproductions/search?movieName=' +
      this.autocomplete.input;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        // Handle the response data
        this.movies = response;
        this.rows = this.chunkArray(this.movies, 4);
      },
      (error) => {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    );
  }

  // Function to chunk array into smaller arrays (rows)
  chunkArray(array: any[], size: number): any[] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  navigateToProducts(movieId: string) {
    this.router.navigate([`/movies/${movieId}/products`]);
  }
}
