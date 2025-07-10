import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth1Service {

  
  private baseUrl = 'http://localhost:8080/api/patients';

  constructor(private http: HttpClient) {}

  getCurrentPatient(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
