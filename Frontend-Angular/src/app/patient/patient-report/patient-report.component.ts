import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-patient-report',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './patient-report.component.html',
  styleUrl: './patient-report.component.css'
})
export class PatientReportComponent implements OnInit {
 
patientId: number = 0;
patientName: string = ''; 
prescriptionDetails: any[] = [];
medicines: string[] = [];
today = new Date();



  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  // ngOnInit(): void {
  //   this.patientId = this.route.snapshot.params['patientId'];

  //   if (this.patientId) {
  //     this.http.get(`http://localhost:8080/api/prescriptions/patient/${this.patientId}`)
  //       .pipe(take(1))
  //       .subscribe((response: any) => {
  //         this.prescriptionDetails = response['prescriptionDetails'];
  //         this.medicines = response['medicines'];
  //       }, (error) => {
  //         console.error('Error retrieving patient report:', error);
  //       });
  //   } else {
  //     console.error('Patient ID is not provided');
  //   }
  // }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const patientData = localStorage.getItem('patientToken');
     if (patientData) {
      const patient = JSON.parse(patientData);
      this.patientName = patient.fullName || 'Patient';
      
    }
      this.patientId = params['patientId'];

      if (this.patientId) {
        this.http.get(`http://localhost:8080/api/prescriptions/patient/${this.patientId}`)
          .pipe(take(1))
          .subscribe((response: any) => {
            this.prescriptionDetails = response['prescriptionDetails'];
            this.medicines = response['medicines'];
          }, (error) => {
            console.error('Error retrieving patient report:', error);
          });
      } else {
        console.error('Patient ID is not provided');
      }
    });
  }
  

  printReport(): void {
    window.print();
  }

  
}



