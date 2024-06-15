import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-credentials',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './credentials.component.html',
  styleUrl: './credentials.component.css'
})
export class CredentialsComponent {
  username = '';  
  password = '';

  constructor() { 
    this.generateUsername();
    this.generatePassword();
  }
  generateUsername() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let username = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      username += characters[randomIndex];
    }
    this.username = username;
  }

  generatePassword() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    this.password = password;
  }



}
