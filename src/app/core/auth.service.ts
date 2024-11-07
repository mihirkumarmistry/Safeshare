// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Placeholder function to get user type (Admin, Doctor, Staff)
  getUserType(): string {
    // Example: Replace with actual logic (e.g., from a token or API)
    return localStorage.getItem('userType') || 'Guest';
  }
}
