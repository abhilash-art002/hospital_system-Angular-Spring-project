import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-navbar',
  standalone: true,
  imports: [],
  templateUrl: './doctor-navbar.component.html',
  styleUrl: './doctor-navbar.component.css'
})
export class DoctorNavbarComponent implements OnInit {
  doctorName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Retrieve doctor details from local storage
    const doctorData = localStorage.getItem('doctorToken');
    if (doctorData) {
      const doctor = JSON.parse(doctorData);
      this.doctorName = doctor.fullName || 'Doctor'; // Fallback if fullName is missing
    } else {
      // Redirect to login if not logged in
      this.router.navigate(['/doctor-login']);
    }
  }

  logout() {
    localStorage.removeItem('doctorToken'); // Clear doctor session
    alert('Logged out successfully!');
    this.router.navigate(['/doctor-login']); // Redirect to login page
  }
}


