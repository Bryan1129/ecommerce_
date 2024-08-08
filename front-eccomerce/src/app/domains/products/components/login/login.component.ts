import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // La API devuelve `accessToken`, no `success` ni `token`
        if (response.accessToken) {
          this.authService.setToken(response.accessToken); // Guarda el token correcto
          this.router.navigate(['/products']); // Redirige al usuario a la página de productos
        } else {
          this.errorMessage = response.message || 'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
        }
      },
      error: (error) => {
        console.error('Error en el login', error);
        // Manejo de errores: establece un mensaje de error adecuado
        if (error.status === 401 || error.status === 404) {
          this.errorMessage = 'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
        } else {
          this.errorMessage = 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.';
        }
      },
      complete: () => {
        console.log('Login request complete');
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
