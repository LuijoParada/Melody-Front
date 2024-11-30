import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService); // Inyecta el AuthService
  const router = inject(Router); // Inyecta el Router

  // Verifica si el usuario está autenticado
  const isAuthenticated = authService.isLoggedIn();

  if (!isAuthenticated) {
    // Si no está autenticado, redirige al login
    await router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false; // Bloquea el acceso a la ruta
  }

  return true; // Permite el acceso
};