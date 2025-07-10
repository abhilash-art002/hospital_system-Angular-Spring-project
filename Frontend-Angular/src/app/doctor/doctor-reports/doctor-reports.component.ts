import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-doctor-reports',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './doctor-reports.component.html',
  styleUrl: './doctor-reports.component.css'
})
export class DoctorReportsComponent implements OnInit{
  doctorId: number = 0; 
  appointments: any[] = [];
  selectedAppointmentId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const storedDoctorId = localStorage.getItem('doctorId');
    if (storedDoctorId) {
      this.doctorId = Number(storedDoctorId); // Convert string to number
    }

    if (this.doctorId) {
      this.getAppointments();
    } else {
      console.error('Doctor ID not found in local storage!');
    }
  }
  getAppointments() {
    this.http.get<any[]>(`http://localhost:8080/api/appointments/doctor/${this.doctorId}`)
      .subscribe(data => {
        this.appointments = data;
      });
  }
  selectedPatient(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.selectedAppointmentId = Number(target.value);
    }
  }
  getPatientDetails() {
    if (this.selectedAppointmentId) {
      return this.appointments.find(appointment => appointment.id === this.selectedAppointmentId);
    }
    return null;
  }
  
  

  
  // Get Patient Details
  // getPatientDetails() {
  //   return this.patients.find(patient => patient.id === this.selectedPatient);
  // }

  // Print Report
  printReport() {
    window.print();
  }

  // Save Report (Simulate saving functionality)
  saveReport() {
    alert('Report saved successfully!');
  }
}
