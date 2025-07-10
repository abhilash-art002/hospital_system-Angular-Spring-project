import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-appointment',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './doctor-appointment.component.html',
  styleUrl: './doctor-appointment.component.css'
})
export class DoctorAppointmentComponent implements OnInit {
  doctorId: number = 0;
  appointments: any[] = [];
  

  constructor(private route: ActivatedRoute,private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); // Get the ID as a string
      this.doctorId = idParam ? Number(idParam) : 0; // ✅ Convert to number
      console.log('Doctor ID:', this.doctorId);
    });
    if (this.doctorId) {
      this.fetchAppointments();
    }
  }

  // Fetch appointments for the logged-in doctor
  fetchAppointments() {
    this.appointmentService.getAppointmentsByDoctor(this.doctorId).subscribe({
      next: (data) => (this.appointments = data),
      error: (err) => console.error('Error fetching appointments:', err)
    });
  }


  updateStatus(appointmentId: string, newStatus: string) {
    const numericAppointmentId = Number(appointmentId);
  
    if (!newStatus.trim()) {
      alert('Please enter a valid comment.');
      return;
    }
  
    this.appointmentService.updateAppointmentStatus(numericAppointmentId, newStatus).subscribe({
      next: () => {
        alert('Status updated successfully!');
        this.fetchAppointments(); // Refresh list
      },
      error: (err) => console.error('Error updating status:', err)
    });
  }
  


}
