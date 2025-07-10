import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-prescriptions',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './doctor-prescriptions.component.html',
  styleUrl: './doctor-prescriptions.component.css'
})
export class DoctorPrescriptionsComponent implements OnInit  {
  // doctorId: number = 1; // Assume logged-in doctor's ID is 1 (change as needed)
  doctorId: number = 0; 
  appointments: any[] = [];
  selectedAppointmentId: number | null = null;

  prescription = {
    diagnosis: '',
    medicines: [] as string[],
    dosages: '',
    instructions: ''
  };

  medicinesInput: string = '';

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

  // Get Appointments for the Doctor
  getAppointments() {
    this.http.get<any[]>(`http://localhost:8080/api/appointments/doctor/${this.doctorId}`)
      .subscribe(data => {
        this.appointments = data;
      });
  }

  // Update medicines array
  // updateMedicines() {
  //   this.prescription.medicines = this.medicinesInput.split(',').map(med => med.trim());
  // }
  updateMedicines() {
    this.prescription.medicines = this.medicinesInput.split(',').map(med => med.trim());
  }
  

  // Post Prescription
  submitPrescription() {
    if (!this.selectedAppointmentId) {
      alert('Please select a patient!');
      return;
    }

    this.http.post(`http://localhost:8080/api/prescriptions/${this.selectedAppointmentId}`, this.prescription)
      .subscribe(response => {
        alert('Prescription saved successfully!');
        this.prescription = { diagnosis: '', medicines: [], dosages: '', instructions: '' };
        this.medicinesInput = '';
      }, error => {
        alert('Error saving prescription!');
        console.error(error);
      });
  }
  onSelectAppointment(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.selectedAppointmentId = Number(target.value);
    }
  }
  
  

}
