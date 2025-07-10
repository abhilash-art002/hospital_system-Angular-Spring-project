import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule ,RouterLink,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  user: any = null; // Stores user details

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    
    this.user = this.authService.getUser(); // Get user details on load  
  }

  logout() {
    this.authService.logout(); // Clear session
    this.user = null;
  }
  onClickAppointment(): void {    
      alert('Please login first!');  
      this.router.navigate(['/patient-login']); 
  }

}
