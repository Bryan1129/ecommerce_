import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from './../../../shared/services/auth.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }
}
