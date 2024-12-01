  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import axios from 'axios';

  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private apiUrl = 'http://127.0.0.1:8000/api'; // Cambia esto según tu backend
    private isAuthenticated = false; // Estado de autenticación
    private user: any = null; // Información del usuario

    constructor(private router: Router) {

    }
    // Verifica si el usuario está autenticado
    isLoggedIn(): boolean {
      return this.isAuthenticated;
    }
    // Devuelve la información del usuario loggeado
    getUser(): any {
      return this.user;
    }

    /**
     * Inicia sesión con credenciales
     * @param email Correo del usuario
     * @param password Contraseña del usuario
     */
    async login(email: string, password: string): Promise<void> {
      try {
        const response = await axios.post(`${this.apiUrl}/auth/login`,{ email, password },
          {
            withCredentials: true, // Incluye las cookies para Sanctum
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        // Actualiza el estado de autenticación
        this.isAuthenticated = true;
        this.user = response.data.user; // Guarda la información del usuario
        // Guarda el estado en localStorage
        this.saveAuthState();

        console.log('Login exitoso:', this.user);
        this.router.navigate(['/profile']);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error en el login:', error.response?.data || error.message);
        } else {
          console.error('Error en el login:', error);
        }
        throw error; // Puedes manejar esto en el componente
      }
    }
    //Cierra la sesion mandando 
    public logout(){
      try {
        this.isAuthenticated = false; // Cambia el estado
        this.user = null; // Limpia la información del usuario
        // Limpia el estado en localStorage
        this.clearAuthState();
      } catch (error) {

        console.log('cai en el catch');
        if (axios.isAxiosError(error)) {
          console.error('Error al cerrar sesión:', error.response?.data || error.message);
        } else {
          console.error('Error al cerrar sesión:', error);
        }
        throw error;
      }
    }
    //Restaura el estado de autenticación desde localStorage
    public restoreAuthState(): void {

      const savedAuthState = localStorage.getItem('isAuthenticated');
      const savedUser = localStorage.getItem('user');

      if (savedAuthState === 'true' && savedUser) {
        this.isAuthenticated = true;
        this.user = JSON.parse(savedUser);
      } else {
        this.isAuthenticated = false;
        this.user = null;
      }
    }
    //Guarda el estado de autenticación en localStorage
    private saveAuthState(): void {
      // Guardar solo si `user` no es nulo
      console.log('saveauthstate veamos si podemos autenticarnos');
      if (this.isAuthenticated && this.user) {
        console.log('Guardando estado de autenticación');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        this.clearAuthState(); // Limpia si el estado es inválido
      }
    }
    //Limpia el estado de autenticación en localStorage
    private clearAuthState(): void {
      console.log('Limpiando estado de autenticación');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    }
  }