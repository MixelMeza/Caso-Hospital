import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DoctorComponent } from './doctor/doctor.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    title: 'Doctor'
  },
  {
    path: 'especialidad',
    component: EspecialidadComponent,
    title: 'Doctor'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];
