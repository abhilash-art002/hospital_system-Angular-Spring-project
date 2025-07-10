import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.css'
})
export class DoctorProfileComponent implements OnInit{
  doctor: any = {
    
    fullName: '',
    email: '',
    specialistField: '',
    password: '', // Masked by default
    newPassword: ''
  };

  doctorId: string | null = '';
  showPassword = false;
  isEditingPassword = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.doctorId = this.route.snapshot.paramMap.get('id');
    if (this.doctorId) {
      this.fetchDoctorProfile(this.doctorId);
    }
  }

  fetchDoctorProfile(id: string) {
    this.http.get(`http://localhost:8080/api/doctors/${id}`).subscribe({
      next: (response: any) => {
        this.doctor = response;
       
      },
      error: (error) => {
        console.error('Error fetching doctor profile:', error);
      }
    });
  }

  updateProfile() {
    const updatedDoctor = { ...this.doctor };
  
    // Ensure we only send a new password if it's entered
    if (!this.isEditingPassword || !this.doctor.newPassword) {
      delete updatedDoctor.newPassword; // Remove newPassword if not updating
    } else {
      updatedDoctor.password = this.doctor.newPassword; // Assign new password
    }
  
    this.http.put(`http://localhost:8080/api/doctors/${this.doctorId}`, updatedDoctor).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        window.location.reload(); 
        this.isEditingPassword = false; // Reset password edit mode
      },
      error: (error) => {
        console.error('Error updating doctor profile:', error);
      }
    });
  }
  

  resetChanges() {
    if (this.doctorId) {
      this.fetchDoctorProfile(this.doctorId);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  enablePasswordEdit() {
    this.isEditingPassword = true;
    this.doctor.newPassword = ''; // Clear the new password field
  }
}
