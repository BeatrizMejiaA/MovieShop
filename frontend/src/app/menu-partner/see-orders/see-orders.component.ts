import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

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
  product: Product;
  total: string;
  merchant: Merchant;
  id: string;
  user: User;
  status: string;
}

interface MerchantOrders {
  orders: Order[];
  id: string;
}

@Component({
  selector: 'app-see-orders',
  templateUrl: './see-orders.component.html',
  styleUrls: ['./see-orders.component.scss'],
})
export class SeeOrdersComponent implements OnInit {
  merchants: MerchantOrders[] = [];
  email: string = '';

  constructor(
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.email = (await localStorage.getItem('email')) as string;
    this.fetchOrders();
  }

  fetchOrders() {
    this.http
      .get<MerchantOrders[]>(
        `https://g0yp58mdr2.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/merchants/${this.email}/pendentorders`
      )
      .subscribe(
        (data) => {
          this.merchants = data;
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
  }

  async updateStatus(
    orderId: string,
    customerEmail: string,
    newStatus: string
  ) {
    const new_status = {
      status: newStatus,
    };
    const token = (await localStorage.getItem('token')) as string;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .put(
        `https://ew99t2gt72.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/users/${customerEmail}/orders/${orderId}`,
        new_status
       // { headers: headers } // Include the headers here
      )
      .subscribe(
        async () => {
          this.fetchOrders(); // Reload the orders to reflect the changes
          const alert = await this.alertController.create({
            header: 'Success',
            message: 'Order status updated successfully.',
            buttons: ['OK'],
          });
          await alert.present();
        },
        async (error) => {
          console.error('Error updating order status:', error);
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'There was an error updating the order status.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
  }
}
