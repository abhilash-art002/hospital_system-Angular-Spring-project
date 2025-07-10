import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../common_components/navbar/navbar.component';
import { DashboardComponent } from '../../common_components/dashboard/dashboard.component';
import { FooterComponent } from '../../common_components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientNavbarComponent } from '../patient-navbar/patient-navbar.component';
import { PatientFeedbackComponent } from '../patient-feedback/patient-feedback.component';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [PatientNavbarComponent, DashboardComponent, CommonModule,FormsModule,PatientFeedbackComponent],
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  patientName: string = '';
  showWelcome: boolean = true; // Flag to control the visibility of the welcome message
  patientId: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Get patient data from localStorage
    const patientData = localStorage.getItem('patientToken');
    if (patientData) {
      const patient = JSON.parse(patientData);
      this.patientName = patient.fullName || 'Patient';
      this.patientId = patient.id || null; 
    } else {
      // If no patient data is found, redirect to login page
      this.router.navigate(['/patient-login']);
    }

    // After 3 seconds, hide the welcome message and show the rest of the content
    setTimeout(() => {
      this.showWelcome = false;
    }, 1400); 
  }
}
