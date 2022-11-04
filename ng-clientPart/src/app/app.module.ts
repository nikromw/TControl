import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AUTH_API_URL, STORE_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LittleNoticeComponent } from './components/little-notice/little-notice.component';
import { BaseMenuComponent } from './components/base-menu/base-menu.component';
import { AuthComponent } from './components/auth/auth.component';
export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrdersComponent,
    LittleNoticeComponent,
    BaseMenuComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    JwtModule.forRoot({
      config:{
        tokenGetter, 
        allowedDomains: environment.tokenWhiteListedDomains
      }
    })
  ],
  exports: [HomeComponent, OrdersComponent],
  providers: [{
    provide: AUTH_API_URL,
    useValue: environment.authApi
  },
  {
    provide: STORE_API_URL,
    useValue: environment.storeApi
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
