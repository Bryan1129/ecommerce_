import { Component, inject, signal } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './../../components/product/product.component'
import {Product} from './../../../shared/models/product.model';
import {HeaderComponent} from './../../../shared/components/header/header.component'
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';
import { error } from 'console';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products = signal<Product[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  ngOnInit () {
    this.productService.getProducts()
    .subscribe ({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {

      }
    })
  }


  addToCart(product: Product){
    this.cartService.addToCart(product);
  }
}
