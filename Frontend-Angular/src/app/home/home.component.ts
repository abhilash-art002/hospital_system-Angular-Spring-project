import { Component } from '@angular/core';
import { NavbarComponent } from '../common_components/navbar/navbar.component';
import { DashboardComponent } from '../common_components/dashboard/dashboard.component';
import { FooterComponent } from '../common_components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,DashboardComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
