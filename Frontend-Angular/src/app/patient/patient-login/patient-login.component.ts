import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../common_components/navbar/navbar.component';

@Component({
  selector: 'app-patient-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,NavbarComponent],
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.css'
})
export class PatientLoginComponent {
  credentials = { email: '', password: '' };

  constructor(private patientService: PatientService, private router: Router) {}

  loginPatient() {
    this.patientService.login(this.credentials).subscribe(
      (response) => {
        localStorage.setItem('patientToken', JSON.stringify(response));
        alert('Login Successful!');
        this.router.navigate(['/patient-dashboard']);
      },
      (error) => {
        alert('Invalid Email or Password!');
      }
    );
  }
}
