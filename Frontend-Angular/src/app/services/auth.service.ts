import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'userObj'; // Key for storing user data

  

  // Safe method to check localStorage availability
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Save user details in localStorage
  setUser(user: any) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  // Get the logged-in user details
  getUser() {
    if (this.isLocalStorageAvailable()) {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  // Logout user
  logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.userKey);
    }
  }
  
}
