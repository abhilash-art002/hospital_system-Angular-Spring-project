import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
   private apiUrl = 'http://localhost:8080/api';
   private baseUrl = 'http://localhost:8080/api/doctors';


  constructor(private http: HttpClient) { }
   // Fetch all doctors
   getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  
   getDoctorsBySpecialization(specialization: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?specialization=${specialization}`);
  }
  getAllDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
