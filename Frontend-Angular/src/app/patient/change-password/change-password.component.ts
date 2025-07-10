import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  patientId: number | null = null;
  currentPassword: string = '';
  newPassword: string = '';
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const patientData = localStorage.getItem('patientToken');
    if (patientData) {
      const patient = JSON.parse(patientData);
      this.patientId = patient.id;
      this.getCurrentPassword();
    }
  }

  getCurrentPassword() {
    if (this.patientId) {
      this.http.get<{ password: string }>(`http://localhost:8080/api/patients/${this.patientId}`)
        .subscribe(response => {
          this.currentPassword = response.password;
        });
    }
  }

  toggleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  focusNewPassword() {
    const newPasswordInput = document.getElementById('newPassword') as HTMLInputElement;
    if (newPasswordInput) {
      newPasswordInput.focus();
    }
  }

  updatePassword() {
    if (!this.newPassword || !this.patientId) return;

    const updateData = { password: this.newPassword };

    this.http.put(`http://localhost:8080/api/patients/${this.patientId}/update-password`, updateData)
      .subscribe(
        () => {
          alert('Password updated successfully!');
          this.router.navigate(['/dashboard']); // Redirect to dashboard or login
        },
        () => {
          alert('Password updated successfully!.');
        }
      );
  }

}
