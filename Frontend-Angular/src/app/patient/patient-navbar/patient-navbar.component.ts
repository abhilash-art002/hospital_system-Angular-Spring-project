import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-navbar',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterOutlet],
  templateUrl: './patient-navbar.component.html',
  styleUrl: './patient-navbar.component.css'
})
export class PatientNavbarComponent implements OnInit {
  patientName: string = ''; // Store the logged-in patient's name
  patientId: number | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const patientData = localStorage.getItem('patientToken');
    if (patientData) {
      const patient = JSON.parse(patientData);
      this.patientName = patient.fullName || 'Patient';
      this.patientId = patient.id || null; 
    }
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('patientToken'); // Remove patient data from localStorage
    this.router.navigate(['/patient-login']); // Redirect to login page
  }

  // Change Password function
  changePassword(): void {
    this.router.navigate(['/change-password']); // Redirect to change password page
  }

}
