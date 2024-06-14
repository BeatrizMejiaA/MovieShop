import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Product {
  name: string;
  createdAt: number;
  id: string;
  shippingPrice: string;
  photos: { url: string }[];
  price: string;
}

interface Merchant {
  lastName: string;
  zipCode: string;
  city: string;
  address1: string;
  mobile: string;
  photo: string;
  birthDate: string;
  createdAt: number;
  emailPaypal: string;
  password: string;
  name: string;
  middleName: string;
  state: string;
  id: string;
  updatedAt: number;
}

interface User {
  lastName: string;
  zipCode: string;
  city: string;
  address1: string;
  repeatpass: string;
  mobile: string;
  photo: string;
  birthDate: string;
  password: string;
  name: string;
  middleName: string;
  id: string;
  state: string;
}

interface Order {
  createdAt: number;
  product: Product[];
  total: string;
  merchant: Merchant;
  id: string;
  user: User;
  status: string;
  showCardInput?: boolean;
  paypalemail?: string;
}

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];
  useremail: string = '';

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.useremail = (await localStorage.getItem('useremail')) as string;
    this.getOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(
        'https://ew99t2gt72.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/users/' +
          this.useremail +
          '/orders'
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching orders:', error);
          return throwError(error);
        })
      );
  }

  payOrder(orderId: string) {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      order.showCardInput = true;
    }
  }

  orderReceived(orderId: string) {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      const apiUrl = `https://ew99t2gt72.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/users/${this.useremail}/orders/${orderId}`;
      const paymentData = {
        status: 'PRODUCT_RECEIVED',
      };
      this.http.put(apiUrl, paymentData).subscribe({
        next: (response) => {
          alert('Thank you for your purchase!');
        },
        error: (error) => {
         alert('Please try again');
        },
      });
    }
  }

  async submitPayment(orderId: string) {
    const order = this.orders.find((o) => o.id === orderId);
    if (order ) {
      const apiUrl = `https://ew99t2gt72.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/users/${this.useremail}/orders/${orderId}`;
      const paymentData = {
        status: 'PAYED',
      };

      // Add authentication token
      const token = (await localStorage.getItem('usertoken')) as string;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http.put(apiUrl, paymentData, { headers }).subscribe({
        next: (response) => {
          console.log('Payment successful:', response);
          alert('Payment successful!');
          order.status = 'PAYED';
          order.showCardInput = false;
        },
        error: (error) => {
          console.error('Error processing payment:', error);
          alert('Payment failed. Please try again.');
        },
      });
    } else {
      alert('Please fill in all the card details.');
    }
  }
}
