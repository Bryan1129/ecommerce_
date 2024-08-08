import { Routes } from '@angular/router';
import { ProductListComponent } from './domains/products/pages/product-list/product-list.component';
import { LoginComponent } from './domains/products/components/login/login.component';
import { RegistroComponent } from './domains/products/components/registro/registro.component';
import { HomeComponent } from './domains/products/components/home/home.component';
import { ProductManagementComponent } from './domains/info/pages/about/about.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistroComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'administrar',
    component: ProductManagementComponent
  },
  {
    path: 'redes',
    component: HomeComponent
  },
  { 
    path: '**', 
    redirectTo: 'login'
  }
];
