// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AppointmentService } from '../../services/appointment.service';
// import { DoctorService } from '../../services/doctor.service';
// import { PatientService } from '../../services/patient.service';

// @Component({
//   selector: 'app-appointment-from',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './appointment-from.component.html',
//   styleUrl: './appointment-from.component.css'
// })
// export class AppointmentFromComponent implements OnInit {
//   // appointmentForm!: FormGroup;
//   // doctors: any[] = [];

//   // constructor(
//   //   private fb: FormBuilder,
//   //   private appointmentService: AppointmentService,
//   //   private doctorService: DoctorService,
//   //   private patientService: PatientService
//   // ) {}

//   // ngOnInit() {
//   //   this.appointmentForm = this.fb.group({
//   //     patientId: ['', Validators.required],
//   //     doctorId: ['', Validators.required],
//   //     fullname: ['', Validators.required],
//   //     gender: ['', Validators.required],
//   //     age: ['', [Validators.required, Validators.min(1)]],
//   //     appointDate: ['', Validators.required],
//   //     email: ['', [Validators.required, Validators.email]],
//   //     phno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//   //     diseases: ['', Validators.required],
//   //     address: ['', Validators.required],
//   //     status: ['Pending']
//   //   });

//   //   this.fetchDoctors();
//   // }
//   //  // Fetch patient details when Patient ID is entered
//   //  fetchPatientDetails() {
//   //   const patientId = this.appointmentForm.get('patientId')?.value;
//   //   if (patientId) {
//   //     this.patientService.getPatientById(patientId).subscribe(
//   //       (patientData) => {
//   //         if (patientData) {
//   //           this.appointmentForm.patchValue({
//   //             fullname: patientData.fullname,
//   //             gender: patientData.gender,
//   //             age: patientData.age,
//   //             email: patientData.email,
//   //             phno: patientData.phno,
//   //             address: patientData.address
//   //           });
//   //         }
//   //       },
//   //       (error) => {
//   //         console.error('Error fetching patient details:', error);
//   //       }
//   //     );
//   //   }
//   // }


//   // // Fetch all doctors
//   // fetchDoctors() {
//   //   this.doctorService.getAllDoctors().subscribe(
//   //     data => {
//   //       this.doctors = data;
//   //     },
//   //     error => {
//   //       console.error('Error fetching doctors:', error);
//   //     }
//   //   );
//   // }

//   // // Handle doctor selection
//   // onDoctorSelect(event: any) {
//   //   const selectedDoctorId = event.target.value;
//   //   this.appointmentForm.patchValue({ doctorId: selectedDoctorId });
//   // }

//   // // Submit appointment form
//   // submitAppointment() {
//   //   if (this.appointmentForm.valid) {
//   //     this.appointmentService.addAppointment(this.appointmentForm.value).subscribe(
//   //       () => {
//   //         alert('Appointment booked successfully!');
//   //         this.appointmentForm.reset();
//   //       },
//   //       (error) => {
//   //         console.error('Error:', error);
//   //         alert('Failed to book appointment.');
//   //       }
//   //     );
//   //   }
//   // }
//   appointmentForm!: FormGroup;
//   doctors: any[] = [];

//   constructor(
//     private fb: FormBuilder,
//     private appointmentService: AppointmentService,
//     private doctorService: DoctorService,
//     private patientService: PatientService // Inject PatientService
//   ) {}

//   ngOnInit() {
//     this.appointmentForm = this.fb.group({
//       patientId: ['', Validators.required],
//       doctorId: ['', Validators.required],
//       fullname: ['', Validators.required],
//       gender: ['', Validators.required],
//       age: ['', [Validators.required, Validators.min(1)]],
//       appointDate: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//       diseases: ['', Validators.required],
//       address: ['', Validators.required],
//       status: ['Pending']
//     });

//     this.fetchDoctors();
//   }

//   // Fetch doctors from backend
//   fetchDoctors() {
//     this.doctorService.getAllDoctors().subscribe(
//       (data) => {
//         this.doctors = data;
//       },
//       (error) => {
//         console.error('Error fetching doctors:', error);
//       }
//     );
//   }

//   // Fetch patient details when Patient ID is entered
//   fetchPatientDetails() {
//     const patientId = this.appointmentForm.get('patientId')?.value;
//     if (patientId) {
//       this.patientService.getPatientById(patientId).subscribe(
//         (patientData) => {
//           if (patientData) {
//             this.appointmentForm.patchValue({
//               fullname: patientData.fullname,
//               gender: patientData.gender,
//               age: patientData.age,
//               email: patientData.email,
//               phno: patientData.phno,
//               address: patientData.address
//             });
//           }
//         },
//         (error) => {
//           console.error('Error fetching patient details:', error);
//         }
//       );
//     }
//   }

//   // Handle doctor selection
//   onDoctorSelect(event: any) {
//     const selectedDoctorId = event.target.value;
//     this.appointmentForm.patchValue({ doctorId: selectedDoctorId });
//   }

//   // Submit appointment form
//   submitAppointment() {
//     if (this.appointmentForm.valid) {
//       this.appointmentService.addAppointment(this.appointmentForm.value).subscribe(
//         () => {
//           alert('Appointment booked successfully!');
//           this.appointmentForm.reset();
//         },
//         (error) => {
//           console.error('Error:', error);
//           alert('Failed to book appointment.');
//         }
//       );
//     }
//   }
// }





import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-appointment-from',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appointment-from.component.html',
  styleUrl: './appointment-from.component.css'
})
export class AppointmentFromComponent implements OnInit {
  appointmentForm!: FormGroup;
  doctors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      fullname: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      appointDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      diseases: ['', Validators.required],
      address: ['', Validators.required],
      status: ['Pending']
    });

    this.fetchDoctors();
  }

  // Fetch all doctors
  fetchDoctors() {
    this.doctorService.getAllDoctors().subscribe(
      data => {
        this.doctors = data;
      },
      error => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  // Fetch patient details when patientId is entered
  fetchPatientDetails() {
    const patientId = this.appointmentForm.get('patientId')?.value;

    if (patientId) {
      this.patientService.getPatientById(patientId).subscribe(
        (patient) => {
          if (patient) {
            this.appointmentForm.patchValue({
              fullname: patient.fullname,
              gender: patient.gender,
              age: patient.age,
              email: patient.email,
              phno: patient.phno,
              address: patient.address
            });
          }
        },
        (error) => {
          console.error('Error fetching patient:', error);
          alert('Patient not found!');
          this.appointmentForm.patchValue({
            fullname: '',
            gender: '',
            age: '',
            email: '',
            phno: '',
            address: ''
          });
        }
      );
    }
  }

  // Handle doctor selection
  onDoctorSelect(event: any) {
    const selectedDoctorId = event.target.value;
    this.appointmentForm.patchValue({ doctorId: selectedDoctorId });
  }

  // Submit appointment form
  // submitAppointment() {
  //   if (this.appointmentForm.valid) {
  //     this.appointmentService.addAppointment(this.appointmentForm.value).subscribe(
  //       () => {
  //         alert('Appointment booked successfully!');
  //         this.appointmentForm.reset();
  //       },
  //       (error) => {
  //         console.error('Error:', error);
  //         alert('Failed to book appointment.');
  //       }
  //     );
  //   }
  // }
  // submitAppointment() {
  //   console.log('Submitting appointment form:', this.appointmentForm.value);
  //   if (this.appointmentForm.valid) {
  //     this.appointmentService.addAppointment(this.appointmentForm.value).subscribe(
  //       () => {
  //         alert('Appointment booked successfully!');
  //         this.appointmentForm.reset();
  //       },
  //       (error) => {
  //         console.error('Error:', error);
  //         alert('Failed to book appointment.');
  //       }
  //     );
  //   } else {
  //     console.log('Form is invalid:', this.appointmentForm.errors);
  //   }
  // }
  submitAppointment() {
    console.log('Submitting appointment form:', this.appointmentForm.value);
    if (this.appointmentForm.valid) {
        const appointmentData = {
            ...this.appointmentForm.value,
            patient: { id: this.appointmentForm.get('patientId')?.value }, // Include patient object
            doctor: { id: this.appointmentForm.get('doctorId')?.value } // Include doctor object
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
