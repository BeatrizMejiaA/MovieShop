import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-products',
  templateUrl: './movie-products.component.html',
  styleUrls: ['./movie-products.component.scss'],
})
export class MovieProductsComponent implements OnInit {
  movieId: string;
  products: any[] = [];
  movieData: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.movieId = '';

  }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id') || '';
    //this.fetchProducts(this.movieId);
    this.fetchMovieData(this.movieId);
  }

  fetchMovieData(movieId: string) {
    // Replace with your actual API endpoint
    movieId = 'MVP-CLIMADOAMOR124'
    const apiUrl = `https://p8lh5fvcdi.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/visualproductions/${movieId}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.movieData = response.Item;
        console.log(this.movieData.createdAt);
      },
      (error) => {
        console.error('Error fetching movie data:', error);
      }
    );
  }
}
