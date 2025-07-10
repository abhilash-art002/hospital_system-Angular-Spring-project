import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-patients.component.html',
  styleUrl: './doctor-patients.component.css'
})
export class DoctorPatientsComponent implements OnInit {
  doctorId: number = 0;
  appointments: any[] = [];
  showDetails: boolean[] = []; // Array to track details visibility


  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    // ✅ Retrieve doctor ID from localStorage
    const storedDoctorId = localStorage.getItem('doctorId');
    if (storedDoctorId) {
      this.doctorId = Number(storedDoctorId); // Convert to number
      console.log('Doctor ID from Local Storage:', this.doctorId);
      this.fetchAppointments();
    } else {
      console.error('Doctor ID not found in localStorage');
    }
  }

  // Fetch appointments for the logged-in doctor
  fetchAppointments() {
    if (this.doctorId) {
      this.appointmentService.getAppointmentsByDoctor(this.doctorId).subscribe({
        next: (data) => {
          this.appointments = data;
          console.log('Appointments:', this.appointments);
        },
        error: (err) => console.error('Error fetching appointments:', err)
      });
    } else {
      console.error('Cannot fetch appointments: doctorId is missing');
    }
  }
  toggleDetails(index: number) {
    this.showDetails[index] = !this.showDetails[index]; // Toggle visibility for selected card
  }
}
