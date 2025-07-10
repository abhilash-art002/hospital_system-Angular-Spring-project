import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../common_components/navbar/navbar.component';

@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [FormsModule,CommonModule,NavbarComponent],
  templateUrl: './doctor-login.component.html',
  styleUrl: './doctor-login.component.css'
})
export class DoctorLoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginData = { email: this.email, password: this.password };

    this.http.post<any>('http://localhost:8080/api/doctors/login', loginData)
      .subscribe(
        (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('doctorToken', JSON.stringify(response));  // Store doctor data
          localStorage.setItem('doctorId', response.id);  // ✅ Save doctor ID separately
        
          alert('Login Successful!');

          // ✅ Redirect to Doctor Dashboard
          this.router.navigate(['/doctor-dashboard', { id: response.id }]);

        },
        (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password';
        }
      );
  }
}