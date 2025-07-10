// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PatientService {
//   private baseUrl = 'http://localhost:8080/api/patients'; // Adjust if needed

//   constructor(private http: HttpClient) {}

//   register(patient: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/register`, patient);
//   }

//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/login`, credentials);
//   }
   
//   getPatientData(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/me`);
//   }


// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:8080/api/patients';

  constructor(private http: HttpClient) {}

  register(patient: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, patient);
  }
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }  
  getPatientById(patientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${patientId}`);
  }
  

}
