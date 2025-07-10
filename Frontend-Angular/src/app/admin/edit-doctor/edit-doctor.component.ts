import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.css'
})
export class EditDoctorComponent implements OnInit {
  doctor: any = {
    fullName: '',
    dob: '',
    qualification: '',
    specialistField: '',
    email: '',
    mobile: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.getDoctorByEmail(email);
    }
  }

  getDoctorByEmail(email: string): void {
    this.http.get(`http://localhost:8080/api/doctors/email/${email}`)
      .subscribe(
        (data) => this.doctor = data,
        (error) => console.error('Error fetching doctor', error)
      );
  }

  updateDoctor(): void {
    this.http.put(`http://localhost:8080/api/doctors/email/${this.doctor.email}`, this.doctor)
      .subscribe(
        () => {
          alert('Doctor updated successfully!');
          this.router.navigate(['/view-doctor']); // Redirect to view doctor page
        },
        (error) => console.error('Error updating doctor', error)
      );
  }

}
