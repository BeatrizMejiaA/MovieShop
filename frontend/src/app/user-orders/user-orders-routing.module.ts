import { UserOrdersComponent } from './user-orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieProductsComponent } from '../movie-products/movie-products.component';

const routes: Routes = [
  {
    path: '',
    component: UserOrdersComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserOrdersRoutingModule {}
