import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3300/api/auth'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient, private router: Router) {}
  

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
      catchError(error => {
        console.error('Error en el login', error);
        return throwError(() => new Error('Error en el login'));
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post<any>(`${this.apiUrl}/register`, body).pipe(
      catchError(error => {
        console.error('Error en el registro', error);
        return throwError(() => new Error('Error en el registro'));
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }
}

