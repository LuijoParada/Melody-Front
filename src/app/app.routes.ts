import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MusictopartitureComponent } from './components/musictopartiture/musictopartiture.component';
import { LearnpathComponent } from './components/learnpath/learnpath.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EjerciciosTonalesComponent } from './components/ejercicios-tonales/ejercicios-tonales.component';
import { EjerciciosRitmicosComponent } from './components/ejercicios-ritmicos/ejercicios-ritmicos.component';
import { EjerciciosMelodicosComponent } from './components/ejercicios-melodicos/ejercicios-melodicos.component';
import { EjercicioComponent } from './components/ejercicio/ejercicio.component';
import { authGuard } from './guard/auth.guard';


export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'audio-to-partiture', component: MusictopartitureComponent},
    {path: 'learning-path', component: LearnpathComponent},
    {path: 'challenges', component: ChallengesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    //esta ruta estara protegida por el guard
    {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
    {path: 'tonales', component: EjerciciosTonalesComponent},
    { path: 'ritmicos', component: EjerciciosRitmicosComponent },
    { path: 'melodicos', component: EjerciciosMelodicosComponent },
    { path: 'ejercicio/:tipo/:nivel', component: EjercicioComponent} ,
    {path: '**', component: NotfoundComponent}

];
