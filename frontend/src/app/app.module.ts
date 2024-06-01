import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [AppComponent,MovieProductsComponent,LoginComponent,SignInComponent,PartnerComponent, PartnerSignUpComponent,LoginPromptComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,FormsModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}