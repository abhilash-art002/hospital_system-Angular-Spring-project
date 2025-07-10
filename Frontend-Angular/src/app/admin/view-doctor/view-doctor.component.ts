import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-view-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-doctor.component.html',
  styleUrl: './view-doctor.component.css'
})
export class ViewDoctorComponent implements OnInit {
  
  doctors: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.http.get<any[]>('http://localhost:8080/api/doctors')
      .subscribe(
        data => this.doctors = data,
        error => console.error('Error fetching doctors', error)
      );
  }

  editDoctor(email: string): void {
    this.router.navigate(['/edit-doctor', email]); // Redirects to the edit page with email as a parameter
  }

  deleteDoctor(email: string): void {
    if (confirm(`Are you sure you want to delete doctor with email: ${email}?`)) {
      this.http.delete(`http://localhost:8080/api/doctors/email/${email}`, { responseType: 'text' })
        .subscribe(
          response => {
            console.log('Server Response:', response);
            this.successMessage = response; // Use response from the server
            this.errorMessage = '';
            this.doctors = this.doctors.filter(doctor => doctor.email !== email);
          },
          error => {
            console.error('Delete Error:', error);
            if (error.status === 404) {
              this.errorMessage = `Doctor with email ${email} not found.`;
            } else {
              this.errorMessage = `Failed to delete doctor with email ${email}. Try again!`;
            }
            this.successMessage = '';
          }
        );
    }
  }
  
  
}
