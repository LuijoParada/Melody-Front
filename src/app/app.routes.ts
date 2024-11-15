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
import { EjercicioComponent } from './components/ejercicio/ejercicio.component';


export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'audio-to-partiture', component: MusictopartitureComponent},
    {path: 'learning-path', component: LearnpathComponent},
    {path: 'challenges', component: ChallengesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent },
    {path: 'tonales', component: EjerciciosTonalesComponent},
    {path: 'ejercicio/:nivel', component: EjercicioComponent},
    {path: '**', component: NotfoundComponent}

];
