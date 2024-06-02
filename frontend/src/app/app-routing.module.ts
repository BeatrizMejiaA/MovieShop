import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MovieProductsComponent } from './movie-products/movie-products.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PartnerComponent } from './partner/partner.component';
import { PartnerSignUpComponent } from './partner-sign-up/partner-sign-up.component';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';
import { LoginPartnerComponent } from './login-partner/login-partner.component';
import { MenuPartnerComponent } from './menu-partner/menu-partner.component';
import { AddProductsComponent } from './menu-partner/add-products/add-products.component';
import { AddProductsToMoviesComponent } from './menu-partner/add-products-to-movies/add-products-to-movies.component';
import { SeeOrdersComponent } from './menu-partner/see-orders/see-orders.component';
import { AssignProductsToMoviesComponent } from './menu-partner/assign-products-to-movies/assign-products-to-movies.component';
import { MoviesAndProductsComponent } from './menu-partner/movies-and-products/movies-and-products.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.Tab1PageModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.Tab1PageModule),
  },
  { path: 'movies/:id/products', component: MovieProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignInComponent },
  { path: 'partner', component: PartnerComponent },
  { path: 'partner-sign-up', component: PartnerSignUpComponent },
  { path: 'login-selection', component: LoginPromptComponent },
  { path: 'login-partner', component: LoginPartnerComponent },
  {
    path: 'menu-partner',
    component: MenuPartnerComponent,
    children: [
      { path: 'add-products', component: AddProductsComponent },
      { path: 'movies-and-products', component: MoviesAndProductsComponent },
      { path: 'add-products-to-movies', component: AddProductsToMoviesComponent },
      { path: 'see-orders', component: SeeOrdersComponent },
      { path: 'moviesproducts/:id/products', component: AssignProductsToMoviesComponent },
      ],
  },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
