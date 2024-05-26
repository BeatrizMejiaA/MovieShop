import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './home.page';
import { MovieProductsComponent } from '../movie-products/movie-products.component';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
