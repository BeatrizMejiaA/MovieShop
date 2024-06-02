import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: string;
  name: string;
  photos: { url: string }[];
  price: string;
  shippingPrice: string;
  editMode?: boolean;
}

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];
  submitted: boolean = false;
  errorMessage: string = '';
  token: string = '';
  email: string = '';
  constructor(private fb: FormBuilder, private http: HttpClient) {
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
     this.email = await localStorage.getItem('email') as string;
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
  editProduct(updatedProduct: Product) {
    // Find the index of the product to be updated
    const index = this.products.findIndex(product => product.id === updatedProduct.id);

    // If the product is found, update it
    if (index !== -1) {
      // Send an API request to update the product
      this.http.put<any>(`https://x5f5kkafme.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/merchants/${this.email}/products/${updatedProduct.id}`, updatedProduct)
        .subscribe(
          (response) => {
            console.log('Product updated successfully:', response);
            // Update the product in the products array
            this.products[index] = updatedProduct;
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
    } else {
      console.error('Product not found for editing:', updatedProduct);
    }
  }

  deleteProduct(product: Product) {
    // Add your delete product logic here
    console.log('Delete product:', product);
  }

  get photoForms() {
    return this.productForm.get('photos') as any;
  }

  addPhoto() {
    const photo = this.fb.group({
      url: ['', Validators.required],
    });
    this.photoForms.push(photo);
  }

  removePhoto(i: number) {
    this.photoForms.removeAt(i);
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      this.http
        .post<any>(
          `https://x5f5kkafme.execute-api.eu-central-1.amazonaws.com/movieshop-nl-dev/merchants/${this.email}/products`,
          this.productForm.value
        )
        .subscribe(
          (response) => {
            console.log('Product added successfully:', response);
            // Add the newly added product to the list
            this.products.push(this.productForm.value);
            // Reset the form
            this.productForm.reset();
            this.submitted = false;
          },
          (error) => {
            console.error('Error adding product:', error);
            // Handle error
          }
        );
    }
  }
}
