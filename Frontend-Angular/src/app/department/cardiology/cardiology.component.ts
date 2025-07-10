import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cardiology',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardiology.component.html',
  styleUrl: './cardiology.component.css'
})
export class CardiologyComponent {
  doctors = [
    { name: 'Dr. Abhilash Das', specialty: 'Senior Cardiologist', image: '../../../assets/images/cardiology/cardiology-doc-4.jpg' },
    { name: 'Dr. Sudipta Rout', specialty: 'Heart Surgeon', image: '../../../assets/images/cardiology/cardiology-doc-3.png' },
    { name: 'Dr. Manoj Das', specialty: 'Pediatric Cardiologist', image: '../../../assets/images/cardiology/cardilogy-doc-1.png' },
    { name: 'Dr. Kanha sahu', specialty: 'Interventional Cardiologist', image: '../../../assets/images/cardiology/cardiology-doc-2.jpg' },
    { name: 'Pranati Swain', specialty: 'Cardiac Electrophysiologist', image: '../../../assets/images/cardiology/cardiology-doc-5.jpg' }
  ];

  galleryImages = [
    '../../../assets/images/cardiology/cardiology1.jpg', '../../../assets/images/cardiology/cardiology2.jpg',
    '../../../assets/images/cardiology/cardiology3.jpg', '../../../assets/images/cardiology/cardiology4.jpg'
  ];

  achievements = [
    { year: '2020', description: 'Performed 500+ successful heart surgeries' },
    { year: '2021', description: 'Ranked #1 in heart disease treatment' },
    { year: '2022', description: 'Introduced advanced AI in heart monitoring' }
  ];
}
