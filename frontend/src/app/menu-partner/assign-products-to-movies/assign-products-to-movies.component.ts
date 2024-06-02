import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


interface Product {
  id: string;
  createdAt: string;
  name: string;
  photos: { url: string }[];
  price: string;
  shippingPrice: string;
  editMode?: boolean;
}

@Component({
  selector: 'app-assign-products-to-movies',
  templateUrl: './assign-products-to-movies.component.html',
  styleUrls: ['./assign-products-to-movies.component.scss'],
})
export class AssignProductsToMoviesComponent  implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];
  submitted: boolean = false;
  errorMessage: string = '';
  token: string = '';
  email: string = '';
  movieId: string;
  name: string = '';
  photo: string = '';
  apiId: string = '';
  id:string = '';
  selectedProducts: Product[] = [];
  successMessage: string = '';
  movieData: any = null;
  constructor(private fb: FormBuilder,private route: ActivatedRoute, private http: HttpClient, private toastController: ToastController, private router: Router) {
    this.movieId = '';
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      photos: this.fb.array([
        this.fb.group({
          url: ['', Validators.required],
        }),
      ]),
      price: ['', Validators.required],
      shippingPrice: ['', Validators.required],
    });

  }

  async ngOnInit() {
    this.token = await localStorage.getItem('token') as string;
    this.id = await localStorage.getItem('id') as string;
     this.email = await localStorage.getItem('email') as string;
     this.name = await localStorage.getItem('name') as string;
     this.photo = await localStorage.getItem('photo') as string;
     this.apiId = await localStorage.getItem('apiId') as string;
     this.fetchProducts();

  }
  fetchProducts() {
    this.http
      .get<Product[]>(
        `https://x5f5kkafme.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/merchants/${this.email}/products`
      )
      .subscribe(
        (data) => {
          this.products = data;
          console.log('Obtiene fetching products:');
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }
  fetchMovieData(movieId: string) {
    // Replace with your actual API endpoint
   // movieId = 'MVP-CLIMADOAMOR124'
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
  deleteProduct(product: Product) {
    // Add your delete product logic here
    console.log('Delete product:', product);
  }
  assignProductToMovie() {
    const payload = {
      name: this.name,
      photo: this.photo,
      apiId: this.apiId,
      source: 'Movie Datab Base',
      products: this.selectedProducts
    };

    const url = `https://37lra03jxc.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/merchants/${this.email}/merchantvisualproduction`;

    //const url =`https://37lra03jxc.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/merchants/${this.email}/merchantvisualproduction/${this.id}`
    this.http.post(url, payload, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).subscribe(
      async (response) => {
        console.log('Product assigned to movie successfully:', response);
        await this.presentToast('Product assigned to movie successfully');
        this.router.navigate([`menu-partner/movies-and-products`]);

      },
     async (error) => {
        console.error('Error assigning product to movie:', error);
        await this.presentToast('This product was already assigned to this movie');
      }
    );
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  toggleProductSelection(product: Product) {
    const index = this.selectedProducts.findIndex((p) => p.id === product.id);
    if (index > -1) {
      this.selectedProducts.splice(index, 1);
    } else {
      this.selectedProducts.push(product);
    }
  }

}
