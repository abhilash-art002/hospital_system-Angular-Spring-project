import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-patient-book-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './patient-book-appointment.component.html',
  styleUrl: './patient-book-appointment.component.css'
})
export class PatientBookAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  doctors: any[] = [];
  patient: any = null; // Store patient details

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      patientId: ['', Validators.required],
      fullname: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      phno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      doctorId: ['', Validators.required],
      appointDate: ['', Validators.required],
      diseases: ['', Validators.required],
      status: ['Pending']
    });

    this.loadPatientDetails();  // Load patient details from localStorage
    this.fetchDoctors();  // Fetch available doctors
  }

   loadPatientDetails() {
    const patientData = localStorage.getItem('patientToken');
    
    if (patientData) {
      try {
        this.patient = JSON.parse(patientData);
        
        if (this.patient && this.patient.id) { // Ensure patient data has an ID
          this.appointmentForm.patchValue({
            patientId: this.patient.id, // Auto-fill patient ID
            fullname: this.patient.fullName,
            email: this.patient.email
          });
        } else {
          console.error('Invalid patient data:', this.patient);
        }
      } catch (error) {
        console.error('Error parsing patient data from localStorage:', error);
      }
    } else {
      console.warn('No patient data found in localStorage.');
    }
  }
  

  // Fetch all available doctors
  fetchDoctors() {
    this.doctorService.getAllDoctors().subscribe(
      (data) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  // Handle doctor selection
  onDoctorSelect(event: any) {
    const selectedDoctorId = event.target.value;
    this.appointmentForm.patchValue({ doctorId: selectedDoctorId });
  }
  submitAppointment() {
    if (!this.patient || !this.patient.id) {
      alert('Patient information is missing. Please log in again.');
      return;
    }
  
    if (this.appointmentForm.valid) {
      const appointmentData = {
        ...this.appointmentForm.value,
        patient: { id: this.patient.id }, // Ensure patient is an object with an ID
        doctor: { id: this.appointmentForm.get('doctorId')?.value }
      };
  
      this.appointmentService.addAppointment(appointmentData).subscribe(
        () => {
          alert('Appointment booked successfully!');
          this.appointmentForm.reset();
        },
        (error) => {
          console.error('Error:', error);
          alert('Failed to book appointment.');
        }
      );
    } else {
      console.log('Form is invalid:', this.appointmentForm.errors);
    }
  }
  
  
  

}
