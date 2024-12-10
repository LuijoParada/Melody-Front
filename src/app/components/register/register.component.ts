import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = "";
  password: string = "";
  name: string = "";
  passwordConfirmation: string = "";
  constructor( private router: Router) {
   }
   
   onSubmit() {
    const register = async (name: string, email: string, password: string, passwordConfirmation: string ) => {

      // Validar que los campos no estén vacíos y si lo están, mostrar un mensaje de error
      if (name == "" || email == "" || password == "" || passwordConfirmation == "") {
        alert('Campos vacíos');
        return;
      }
      // Validar que las contraseñas coincidan
      if (password != passwordConfirmation) {
        alert('Las contraseñas no coinciden');
        return;
      }
      //verificar que el correo sea valido
      if (!email.includes('@') || !email.includes('.')) {
        alert('Correo no valido');
        return;
      }
      
      try {
        //Obtener el token CSRF de la cookie si no existe
        if (!this.getCookie('XSRF-TOKEN')) {
          console.log('Cookie CSRF no encontrada, obteniendo...');
          //Realizar la petición de CSRF
          await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true
          }).then(response => {
            console.log('respuesta', response);
          }).catch(error => {
            console.error('Error obteniendo la cookie CSRF:', error);
          });
        }
        // //Realizar la petición de registro
        await axios.post('http://localhost:8000/api/auth/register', {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation
        }, {
          withCredentials: true,
             
        }).then(response => { 
          
          this.router.navigate(['/login']); // Redirigir al usuario a la página de perfil
          
          console.log('Registro exitoso:', response);
          
        })

      } catch (error) {
        console.error('Error durante el registro', error);
      }
    };
    // Llama a la función de registro con los datos de usuario
    register(this.name, this.email, this.password, this.passwordConfirmation);
  }
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
  }
}
