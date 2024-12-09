import { CanActivateFn, Router  } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService); // Inyecta el AuthService
  const router = inject(Router); // Inyecta el Router

  const isAuthenticated = authService.isLoggedIn();
  const userRole = authService.getUserRole();

  console.log('isAuthenticated:', isAuthenticated);
  console.log('userRole:', userRole);
  if (isAuthenticated && (userRole === 'admin' || userRole === 'master')) {
    // Si no está autenticado, redirige al login
    //router.navigate(['/admin'], { queryParams: { returnUrl: state.url } });
    return true; 
  }
  // Si no está autenticado, redirige al login
  router.navigate([''], { queryParams: { returnUrl: state.url } });
  return false; 

};
