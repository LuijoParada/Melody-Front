import { Component, inject, OnDestroy, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = "";
  password: string = "";
  name: string = "";
  passwordConfirmation: string = "";
  constructor( private router: Router) {
    // Si el usuario ya está autenticado, lo redirigimos a la página de inicio
    // axios.get('http://localhost:8000/api/user', {
    //   withCredentials: true
    // }).then(response => {
    //   console.log('Usuario autenticado:', response.data);
    //   this.router.navigate(['/']);
    // }).catch(error => {
    //   console.error('Error obteniendo el usuario autenticado:', error);
    // });
   }


   onSubmit() {
    const register = async (name: string, email: string, password: string) => {
      try {
        // Solicitar la cookie CSRF primero
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true }).then(response => {
          //hacer registro
          console.log('Cookie CSRF obtenida:', response);
          axios.post('http://localhost:8000/api/auth/register', {
            name: name,
            email: email,
            password: password,
          }, {
            withCredentials: true,
            headers: {
              'X-XSRF-TOKEN': this.getCookie('XSRF-TOKEN'),
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          }).then(response => {
            if (response.data.message == "User Created Successfully") {
              this.router.navigate(['/profile']); // Redirigir al usuario a la página de perfil
            }
            
            console.log('Registro exitoso:', response);
          }).catch(error => { });

        });
    
        // Ahora que tenemos la cookie, podemos registrar al usuario
        //const xsrfToken = this.getCookie('XSRF-TOKEN');
    
        // Realizar la petición de registro
        //await axios.post('http://localhost:8000/api/auth/register', {
        //   name: name,
        //   email: email,
        //   password: password,
        // }, {
        //   withCredentials: true,
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     // Enviamos el token CSRF en el encabezado
        //     'X-XSRF-TOKEN': xsrfToken
        //   }
        // });
    
        //console.log('Registro exitoso:');
      } catch (error) {
        console.error('Error durante el registro', error);
      }
    };
    
    // Llama a la función de registro con los datos de usuario
    register(this.name, this.email, this.password);
  }    
  
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
  }

  
}
