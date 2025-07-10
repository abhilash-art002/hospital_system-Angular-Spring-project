import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent implements OnInit {
  doctorForm!: FormGroup;
  specialists: string[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {    
        this.doctorForm = this.fb.group({
        fullName: ['', Validators.required],  // ✅ Change "fullname" → "fullName"
        dob: ['', Validators.required],
        qualification: ['', Validators.required],  // ✅ Change "quali" → "qualification"
        specialistField: ['', Validators.required],  // ✅ Change "spec" → "specialistField"
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]], // ✅ Change "mobno" → "mobile"
        password: ['', Validators.required]
      });
      
    

    // Fetch specialists from the backend
    this.http.get<any[]>('http://localhost:8080/api/admin/specialists')
    .subscribe(
      (data) => this.specialists = data.map(spec => spec.specName),  
      (error) => console.error('Error fetching specialists', error)
    );
  }



  onSubmit(): void {
    if (this.doctorForm.valid) {
      this.http.post('http://localhost:8080/api/doctors/register', this.doctorForm.value)
                     
        .subscribe(
          response => {
            this.successMessage = 'Doctor added successfully!';
            this.errorMessage = '';
            this.doctorForm.reset();
          },
          error => {
            this.errorMessage = 'Failed to add doctor. Please try again!';
            this.successMessage = '';
          }
        );
    }
  }
}


