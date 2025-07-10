import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { NavbarComponent } from '../../common_components/navbar/navbar.component';


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule,CommonModule,NavbarComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.email === 'admin@gmail.com' && this.password === 'admin') {
      // Store admin session (example: local storage)
      localStorage.setItem('admin', 'true');
      
      this.router.navigate(['/admin-dashboard']); // Redirect to admin panel
    } else {
      this.errorMessage = 'Invalid email or password!';
    }
  }
}
