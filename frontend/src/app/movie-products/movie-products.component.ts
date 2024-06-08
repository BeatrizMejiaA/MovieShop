import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-movie-products',
  templateUrl: './movie-products.component.html',
  styleUrls: ['./movie-products.component.scss'],
})
export class MovieProductsComponent implements OnInit {
  movieId: string;
  products: any[] = [];
  movieData: any = null;
  token: string = '';
  useremail: string = '';
  isLoggedIn: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {
    this.movieId = '';
  }

  async ngOnInit() {
    this.token = (await localStorage.getItem('usertoken')) as string;
    this.movieId = this.route.snapshot.paramMap.get('id') || '';
    this.useremail = (await localStorage.getItem('useremail')) as string;
    //this.fetchProducts(this.movieId);
    this.fetchMovieData(this.movieId);
    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  checkLoginAndNavigate() {
    if (this.isLoggedIn) {
      this.router.navigate(['/user-menu']);
    } else {
      this.router.navigate(['/login-selection']);
    }
  }

  fetchMovieData(movieId: string) {
    // Replace with your actual API endpoint
    // movieId = 'MVP-CLIMADOAMOR124'
    const apiUrl = `https://p8lh5fvcdi.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/visualproductions/${this.movieId}`;
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
  async buyProduct(
    productId: string,
    productName: string,
    price: string,
    merchantId: string
  ) {
    if (this.isLoggedIn) {
      const confirmationAlert = await this.alertController.create({
        header: 'Confirm Purchase',
        message: `Do you want to buy ${productName} for ${price}?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Buy',
            handler: async () => {
              // Call the API to place the order
              const apiUrl =
                'https://ew99t2gt72.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/users/' +
                this.useremail +
                '/orders';
              const orderData = {
                status: 'ORDERED',
                merchant: merchantId,
                user: this.useremail,
                product: productId,
                total: price,
              };
              try {
                await this.http.post(apiUrl, orderData).toPromise();
                // Show success message
                const successAlert = await this.alertController.create({
                  header: 'Success',
                  message: 'Order placed successfully!',
                  buttons: ['OK'],
                });
                await successAlert.present();
              } catch (error) {
                // Show error message
                const errorAlert = await this.alertController.create({
                  header: 'Error',
                  message: 'Failed to place order. Please try again later.',
                  buttons: ['OK'],
                });
                await errorAlert.present();
              }
            },
          },
        ],
      });
      await confirmationAlert.present();
    }
    else{
      const confirmationAlert = await this.alertController.create({
        header: 'Not authenticated',
        message: `Please login or create an account.`,
        buttons: [
          {
            text: 'Ok',
            role: 'Ok',
          }
        ],
      });
      await confirmationAlert.present();
      this.router.navigate(['/login']);
    }

  }
}
