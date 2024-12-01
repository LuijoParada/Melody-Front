import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  constructor( private router: Router, private auth: AuthService) { }

  async onSubmit() {
    
    try {
      const response = await this.auth.login(this.email, this.password).then(response => {
        // Create the cookie with the user info and privileges
        //document.cookie = "user=" + JSON.stringify(response.data);
        console.log('Login exitoso:', response);
        this.router.navigate(['/profile']);
      })

    } catch (response) {
      if (axios.isAxiosError(response)) {
        console.error('Error en el login:', response);
      }
    }
    
    // If login successful, navigate to dashboard create the cookie with the info of the user an his privileges that comes in the response of the laravel sanctum auth
    // are going to be used in the dashboard to show or hide some components depending on the user's privileges
    

    // axios.post('http://localhost:8000/api/auth/login', {  
    //   email: this.email,
    //   password: this.password
    // }, {
    //   withCredentials: true,
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   }
    // }).then(response => {
    //   // Create the cookie with the user info and privileges
    //   document.cookie = "user=" + JSON.stringify(response.data);
    //   console.log('Login exitoso:', response);
    //   this.router.navigate(['/profile']);
    // }).catch(error => {
    //   console.error('Error en el login:', error);
    // });
  }
}
