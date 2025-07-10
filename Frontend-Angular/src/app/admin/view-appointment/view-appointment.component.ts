import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Appointment {
  id: number;
  fullname: string;
  gender: string;
  age: number;
  appointDate: string;
  email: string;
  phno: string;
  diseases: string;
  address: string;
  status: string;
}

@Component({
  selector: 'app-view-appointment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './view-appointment.component.html',
  styleUrl: './view-appointment.component.css'
})
export class ViewAppointmentComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.http.get<Appointment[]>('http://localhost:8080/api/appointments')
      .subscribe(
        (data) => {
          this.appointments = data;
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
  }

}
