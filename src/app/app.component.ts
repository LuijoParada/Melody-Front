import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MusictopartitureComponent } from './components/musictopartiture/musictopartiture.component';
import { LearnpathComponent } from './components/learnpath/learnpath.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { EjerciciosTonalesComponent } from './components/ejercicios-tonales/ejercicios-tonales.component';
import { EjercicioComponent } from './components/ejercicio/ejercicio.component';
import axios from 'axios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ChallengesComponent,
    FooterComponent,
    HeaderComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MusictopartitureComponent,
    LearnpathComponent,
    NotfoundComponent,
    EjercicioComponent,
    EjerciciosTonalesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: '../output.css'
})
export class AppComponent implements OnInit{

   async ngOnInit() {
    try {
    // Si no existe la cookie de CSRF, la obtenemos
    if (!this.getCookie('XSRF-TOKEN')) {
      console.log('Cookie CSRF no encontrada, obteniendo...');

      await axios.get('http://localhost:8000/sanctum/csrf-cookie',
        {
         withCredentials: true // Sin esta opción, la cookie no se establecerá en el navegador, lo que provocará un error 419
         //cabe destacar que todas las demas configuraciones de cors en el backend deben estar bien configuradas para que funcione correctamente

        })
        .then(response => {
          console.log('respuesta', response);

      }).catch(error => {
        console.error('Error obteniendo la cookie CSRF:', error);
      });
    }
  } catch (error) {
    console.error('Error en la petición de CSRF:', error);
  }
  }
  // Función para obtener cookies
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
    }

}
