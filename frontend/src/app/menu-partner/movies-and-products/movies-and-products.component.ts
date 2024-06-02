import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: string;
  name: string;
  price: string;
  shippingPrice: string;
  photos: { url: string }[];
  createdAt: number;
}

interface Movie {
  id: string;
  name: string;
  photo: string;
  createdAt: number;
  source: string;
  apiId: string;
  products: Product[];
}
@Component({
  selector: 'app-movies-and-products',
  templateUrl: './movies-and-products.component.html',
  styleUrls: ['./movies-and-products.component.scss'],
})
export class MoviesAndProductsComponent implements OnInit {
  movies: Movie[] = [];
  email: string = '';
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.email = (await localStorage.getItem('email')) as string;
    this.fetchMoviesAndProducts();
  }

  fetchMoviesAndProducts() {
    this.http
      .get<Movie[]>(
        `https://37lra03jxc.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/merchants/${this.email}/merchantvisualproductions`
      )
      .subscribe(
        (data) => {
          this.movies = data;
        },
        (error) => {
          console.error('Error fetching movies and products:', error);
        }
      );
  }
}
