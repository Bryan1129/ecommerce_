import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
  

  @Output() addToCart = new EventEmitter();

  addToCartHandle() {
    this.addToCart.emit(this.product);
  }
  
}
