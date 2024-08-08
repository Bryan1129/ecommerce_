import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service'; // Ajusta la ruta si es necesario
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  showPassword = false; // Nueva propiedad para manejar la visibilidad de la contraseña

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.user.name, this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/login']); // Redirige al login después del registro
      },
      error: (error) => {
        console.error('Error en el registro', error);
      }
    });
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
