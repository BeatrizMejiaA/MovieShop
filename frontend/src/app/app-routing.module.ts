import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MovieProductsComponent } from './movie-products/movie-products.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PartnerComponent } from './partner/partner.component';
import { PartnerSignUpComponent } from './partner-sign-up/partner-sign-up.component';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';

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
  { path: 'login-selection', component: LoginPromptComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
