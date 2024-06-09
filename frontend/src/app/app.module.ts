import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MovieProductsComponent } from './movie-products/movie-products.component';
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
import { UserMenuComponent } from './user-menu/user-menu.component';
import { AuthService } from './auth.service';
import {MenuModule} from "./menu/menu.module";


@NgModule({
  declarations: [
    AppComponent,
    MovieProductsComponent,
    LoginComponent,
    SignInComponent,
    PartnerSignUpComponent,
    LoginPromptComponent,
    LoginPartnerComponent,
    MenuPartnerComponent,
    AddProductsComponent,
    AddProductsToMoviesComponent,
    SeeOrdersComponent,
    AssignProductsToMoviesComponent,
    MoviesAndProductsComponent,
    UserMenuComponent

  ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MenuModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
