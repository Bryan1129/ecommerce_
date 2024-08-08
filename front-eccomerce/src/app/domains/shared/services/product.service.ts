import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3300/api/products'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener productos', error);
        return throwError(() => new Error('Error al obtener productos'));
      })
    );
  }

  // Crear un nuevo producto
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/NewProduct`, product).pipe(
      catchError(error => {
        console.error('Error al crear el producto', error);
        return throwError(() => new Error('Error al crear el producto'));
      })
    );
  }
  
  // Actualizar un producto existente
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      catchError(error => {
        console.error('Error al actualizar el producto', error);
        return throwError(() => new Error('Error al actualizar el producto'));
      })
    );
  }

  // Eliminar un producto
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el producto', error);
        return throwError(() => new Error('Error al eliminar el producto'));
      })
    );
  }
}
