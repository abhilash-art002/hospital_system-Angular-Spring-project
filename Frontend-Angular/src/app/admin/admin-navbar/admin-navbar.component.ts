import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import bootstrap from '../../../main.server';


@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink,RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
    constructor(private router: Router) {}

   
  
    logout() {
      localStorage.removeItem('admin'); // Remove admin session
      this.router.navigate(['/admin-login']); // Redirect to login page
    }

}
