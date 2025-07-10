import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-register',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './patient-register.component.html',
  styleUrl: './patient-register.component.css'
})
export class PatientRegisterComponent {
  patient = { fullName: '', email: '', password: '' };

  constructor(private patientService: PatientService, private router: Router) {}

  registerPatient() {
    this.patientService.register(this.patient).subscribe(
      (response) => {
        alert('Registration Successful!');
        this.router.navigate(['/patient-login']);
      },
      (error) => {
        alert('Registration Failed! Try again.');
      }
    );
  }
}
