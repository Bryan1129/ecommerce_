import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent
  ],
  selector: 'app-product-management',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class ProductManagementComponent implements OnInit {
  hideSiteMenu = signal(true);
  products: Product[] = [];
  isModalOpen = false;
  isEditMode = false;
  product: Product = { id: '', title: '', price: 0, images: [], creationAt: new Date() };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  openModal(product?: Product): void {
    this.isEditMode = !!product;
    this.product = product ? { ...product } : { id: '', title: '', price: 0, images: [], creationAt: new Date() };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.product = { id: '', title: '', price: 0, images: [], creationAt: new Date() };
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    } else {
      this.productService.createProduct(this.product).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    }
  }

  editProduct(product: Product): void {
    this.openModal(product);
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  onDelete(): void {
    if (this.product.id) {
      this.productService.deleteProduct(this.product.id).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    }
  }
  toogleSideMenu() {
    this.hideSiteMenu.update(prevState => !prevState);
  }
}
