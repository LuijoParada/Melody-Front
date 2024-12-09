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

    //validar que los campos no esten vacios y si lo mostramos un mensaje de error
    if (this.email == "" || this.password == "") {
      alert('Por favor llenar todos los campos');
      return;
    }
    

    try {
      await this.auth.login(this.email, this.password)
      //.then(response => {
        //si la respuesta es User is inactive, mostramos un mensaje de error si no, hacemos el console.log y redirigimos al usuario a la pagina de profile
        //document.cookie = "user=" + JSON.stringify(response.data);
        //console.log('Login exitoso:', this.auth.getUser());   
        //this.router.navigate(['/profile']);
       

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
