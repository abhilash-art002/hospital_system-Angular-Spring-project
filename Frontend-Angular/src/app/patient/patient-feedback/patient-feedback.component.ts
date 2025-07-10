import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-feedback',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './patient-feedback.component.html',
  styleUrl: './patient-feedback.component.css'
})
export class PatientFeedbackComponent {
  rating: number = 0;
  comments: string = '';
  message: string = '';
  stars = Array(5).fill(0);

  constructor(private http: HttpClient) {}

  submitFeedback() {
    const patientData = localStorage.getItem('patientToken');
    if (!patientData) {
      alert('You must be logged in!');
      return;
    }

    const patient = JSON.parse(patientData);
    const patientId = patient.id;

    const feedback = {
      rating: this.rating,
      comments: this.comments
    };

    this.http.post(`http://localhost:8080/api/feedback/add/${patientId}`, feedback)
      .subscribe({
        next: () => {
          this.message = 'Thank you for your feedback!';
          this.rating = 0;
          this.comments = '';
        },
        error: (err) => {
          console.error('Error submitting feedback:', err);
        }
      });
  }
}
