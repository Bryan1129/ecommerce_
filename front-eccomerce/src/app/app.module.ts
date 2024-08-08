import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './domains/products/pages/product-list/product-list.component';
import { ProductManagementComponent } from './domains/info/pages/about/about.component';
import { LoginComponent } from './domains/products/components/login/login.component';
import { RegistroComponent } from './domains/products/components/registro/registro.component';
import { HomeComponent } from './domains/products/components/home/home.component';


import { AuthService } from './domains/shared/services/auth.service';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ProductManagementComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes) // Configura las rutas aquí
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
