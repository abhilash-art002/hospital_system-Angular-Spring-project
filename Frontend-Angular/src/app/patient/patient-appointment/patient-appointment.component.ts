import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-appointment.component.html',
  styleUrl: './patient-appointment.component.css'
})
export class PatientAppointmentComponent implements OnInit {
  appointments: any[] = [];
  patientId: number | null = null;

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  ngOnInit(): void {
    const patientData = localStorage.getItem('patientToken');
    if (patientData) {
      const patient = JSON.parse(patientData);
      this.patientId = patient.id;
      this.loadAppointments();
    } else {
      alert("Please login first.");
      this.router.navigate(['/patient-login']);
    }
  }

  loadAppointments(): void {
    if (this.patientId) {
      this.appointmentService.getAppointments(this.patientId).subscribe(
        (data) => {
          this.appointments = data;
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
    }
  }

}
