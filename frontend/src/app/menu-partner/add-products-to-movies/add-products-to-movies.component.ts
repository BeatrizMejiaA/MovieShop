import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products-to-movies',
  templateUrl: './add-products-to-movies.component.html',
  styleUrls: ['./add-products-to-movies.component.scss'],
})
export class AddProductsToMoviesComponent  implements OnInit {
  autocomplete: { input: string };
  movies: any[] = [];
  rows: any[] = [];
  constructor(private http: HttpClient, private router: Router) {
    this.autocomplete = { input: '' };
   }

  ngOnInit() {}

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
  navigateToProducts(movieId: string, name: string, photo: string, apiId: string, id:string) {
    localStorage.setItem('name', name);
    localStorage.setItem('photo', photo);
    localStorage.setItem('apiId', apiId);
    localStorage.setItem('id', id);
    this.router.navigate([`menu-partner/moviesproducts/${movieId}/products`]);
  }
}
