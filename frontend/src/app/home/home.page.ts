import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  autocomplete: { input: string };
  movies: any[] = [];
  rows: any[] = [];



  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.autocomplete = { input: 'Spi' };
  }

  ngOnInit() {
    this.searchMovie();

  }

  searchMovie() {
    const apiUrl =
      'https://p8lh5fvcdi.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/visualproductions/search?movieName=' +
      this.autocomplete.input;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.movies = response;
        this.rows = this.chunkArray(this.movies, 4);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  navigateToUserOrders() {
    this.router.navigate(['/user-orders']);
  }

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
