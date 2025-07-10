import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  
  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.patientService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/appointments']); // ✅ Redirect on successful login
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}
