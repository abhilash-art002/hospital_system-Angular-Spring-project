import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorService } from './doctor.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/api';
  private baseUrl = 'http://localhost:8080/api/appointments';
  private baseUrl1 = 'http://localhost:8080/api/appointments/user';
  private baseUrl2 = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient, private doctorService: DoctorService) { }

  // Fetch doctors by specialization
  getDoctorsBySpecialization(specialization: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/doctors?specialization=${specialization}`);
  }

  // Add a new appointment
  addAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/appointments`, appointmentData);
  }
  
   // Get appointments by doctor ID
   getAppointmentsByDoctor(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/doctor/${doctorId}`);
  }

 
  
  updateAppointmentStatus(appointmentId: number, newStatus: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/status/${appointmentId}`, { status: newStatus });
  }

  getAppointments(patientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl1}/${patientId}`);
  }
  // Fetch upcoming appointments for a doctor
  getUpcomingAppointments(doctorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl2}/upcoming/${doctorId}`);
  }

  // Fetch recent patients dynamically
  getRecentPatients(doctorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl2}/doctor/${doctorId}/recent-patients`);
  }






}
