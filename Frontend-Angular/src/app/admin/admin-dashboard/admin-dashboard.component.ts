import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule, AdminNavbarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  specialistName: string = '';
  doctorCount: number = 0;
  patientCount: number = 0;
  appointmentCount:number=0;
  specialistCount:number=0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDoctorCount();
    this.getPatientCount();    
    this.getAppointmentCount();
    this.getSpecialistCount();
  }


  addSpecialist() {
    if (!this.specialistName.trim()) {
      alert("Please enter a specialist name");
      return;
    }

    const specialistData = { specName: this.specialistName };

    this.http.post('http://localhost:8080/api/admin/add-specialist', specialistData)
      .subscribe(
        response => {
          alert('Specialist added successfully!');
          this.specialistName = ''; // Clear input field
        },
        error => {
          alert('Failed to add specialist.');
          console.error(error);
        }
      );
  }
  //for count doctors
  getDoctorCount() {
    this.http.get<number>('http://localhost:8080/api/doctors/count')
      .subscribe(
        (count) => {
          this.doctorCount = count;
        },
        (error) => {
          console.error('Error fetching doctor count:', error);
        }
      );
  }
  getPatientCount() {
    this.http.get<number>('http://localhost:8080/api/patients/count')
      .subscribe(
        (count) => {
          this.patientCount = count;
        },
        (error) => {
          console.error('Error fetching patient count:', error);
        }
      );
  }
  getAppointmentCount() {
    this.http.get<number>('http://localhost:8080/api/appointments/count')
      .subscribe(
        (count) => {
          this.appointmentCount = count;
        },
        (error) => {
          console.error('Error fetching appointment count:', error);
        }
      );
  }
  getSpecialistCount() {
    this.http.get<number>('http://localhost:8080/api/admin/specialists-count')
      .subscribe(
        (count) => {
          this.specialistCount = count;
        },
        (error) => {
          console.error('Error fetching specialist count:', error);
        }
      );
  }

}
