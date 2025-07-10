import { Component, OnInit } from '@angular/core';
import { DoctorNavbarComponent } from '../doctor-navbar/doctor-navbar.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorPatientsComponent } from '../doctor-patients/doctor-patients.component';
import { DoctorPrescriptionsComponent } from '../doctor-prescriptions/doctor-prescriptions.component';
import { DoctorReportsComponent } from '../doctor-reports/doctor-reports.component';
import { DoctorProfileComponent } from '../doctor-profile/doctor-profile.component';
import { HttpClient } from '@angular/common/http';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
  doctorName: string = '';
  doctorId: string = ''; 
  specialization: string = 'Cardiology'; // You can make this dynamic
  upcomingAppointments: any[] = [];
  recentPatients: any[] = [];

  constructor(private router: Router,private http: HttpClient,private appointmentservice: AppointmentService) {}
 
  quickActions = [
    {
      icon: 'fa-solid fa-calendar-check',
      label: 'Appointments',
      link: `/doctor-appointments/${this.doctorId}`
    },
    {
      icon: 'fa-solid fa-users',
      label: 'My Patients',
      link: '/doctor-patients'
    },
    {
      icon: 'fa-solid fa-file-medical',
      label: 'Add Prescription',
      link: '/doctor-prescriptions'
    },
    {
      icon: 'fa-solid fa-chart-line',
      label: 'View Reports',
      link: '/doctor-reports'
    }
  ];

 

ngOnInit() {
  // Retrieve doctor details from local storage
  const doctorData = localStorage.getItem('doctorToken');
  if (doctorData) {
    try {
      const doctor = JSON.parse(doctorData);
      this.doctorName = doctor.fullName || 'Doctor';
      this.doctorId = localStorage.getItem('doctorId') || '';
      this.specialization = doctor.specialistField;

      // Convert doctorId to number
      const doctorIdNumber = +this.doctorId;

      // Generate quick actions with numeric doctorId
      this.quickActions = [
        {
          icon: 'fa-solid fa-calendar-check',
          label: 'Appointments',
          link: `/doctor-appointments/${doctorIdNumber}`
        },
        {
          icon: 'fa-solid fa-users',
          label: 'My Patients',
          link: '/doctor-patients'
        },
        {
          icon: 'fa-solid fa-file-medical',
          label: 'Add Prescription',
          link: '/doctor-prescriptions'
        },
        {
          icon: 'fa-solid fa-chart-line',
          label: 'View Reports',
          link: '/doctor-reports'
        }
      ];

      // Fetch upcoming appointments from backend API
      this.http.get(`http://localhost:8080/api/appointments/upcoming/${this.doctorId}`)
        .subscribe({
          next: (response) => {
            this.upcomingAppointments = response as any[];
          },
          error: (error) => {
            console.error('Error fetching upcoming appointments:', error);
          }
        });
    } catch (error) {
      console.error('Invalid token data:', error);
      this.router.navigate(['/doctor-login']);
    }
  } else {
    this.router.navigate(['/doctor-login']);
  }
}

   
  loadRecentPatients(): void {
    this.appointmentservice.getRecentPatients(parseInt(this.doctorId)).subscribe((data: any) => {
      this.recentPatients = data;
    });
  } 
  

  logout() {
    localStorage.removeItem('doctorToken');
    alert('Logged out successfully!');
    this.router.navigate(['/doctor-login']);
  }

}
