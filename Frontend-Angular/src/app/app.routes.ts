import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddDoctorComponent } from './admin/add-doctor/add-doctor.component';
import { ViewDoctorComponent } from './admin/view-doctor/view-doctor.component';
import { EditDoctorComponent } from './admin/edit-doctor/edit-doctor.component';
import { DoctorLoginComponent } from './doctor/doctor-login/doctor-login.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { PatientRegisterComponent } from './patient/patient-register/patient-register.component';
import { PatientLoginComponent } from './patient/patient-login/patient-login.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { AppointmentFromComponent } from './appointment/appointment-from/appointment-from.component';
import { LogComponent } from './log/log.component';
import { ViewAppointmentComponent } from './admin/view-appointment/view-appointment.component';
import { DoctorAppointmentComponent } from './doctor/doctor-appointment/doctor-appointment.component';
import { PatientAppointmentComponent } from './patient/patient-appointment/patient-appointment.component';
import { PatientBookAppointmentComponent } from './patient/patient-book-appointment/patient-book-appointment.component';
import { DoctorPatientsComponent } from './doctor/doctor-patients/doctor-patients.component';
import { DoctorPrescriptionsComponent } from './doctor/doctor-prescriptions/doctor-prescriptions.component';
import { DoctorReportsComponent } from './doctor/doctor-reports/doctor-reports.component';
import { DoctorProfileComponent } from './doctor/doctor-profile/doctor-profile.component';
import { CardiologyComponent } from './department/cardiology/cardiology.component';
import { ChangePasswordComponent } from './patient/change-password/change-password.component';
import { PatientReportComponent } from './patient/patient-report/patient-report.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'admin-add_doctor', component: AddDoctorComponent },
  { path: 'view-doctor', component: ViewDoctorComponent },
  { path: 'edit-doctor/:email', component: EditDoctorComponent },
  { path: 'doctor-login', component: DoctorLoginComponent },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },
  { path: 'patient-register', component: PatientRegisterComponent },
  { path: 'patient-login', component: PatientLoginComponent },
  { path: 'patient-dashboard', component: PatientDashboardComponent },  
  // { path: 'appointments', component: AppointmentFromComponent },
  { path: 'appointments', component: PatientBookAppointmentComponent},  
  { path: 'login', component: LogComponent },
  { path: 'view-appointment', component: ViewAppointmentComponent },
  { path: 'doctor-appointments/:id', component: DoctorAppointmentComponent },
  { path: 'view-appointments', component: PatientAppointmentComponent },  
  { path: 'doctor-patients', component: DoctorPatientsComponent },  
  { path: 'doctor-prescriptions', component: DoctorPrescriptionsComponent },
  { path: 'doctor-reports', component: DoctorReportsComponent},
  { path: 'doctor-profile/:id', component: DoctorProfileComponent},
  { path: 'cardiology', component: CardiologyComponent},
  { path: 'change-password', component: ChangePasswordComponent},  
  { path: 'report/:patientId', component: PatientReportComponent},
  

  

  
  
];
