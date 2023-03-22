import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./componentes/home/home.component";
import {ReservaComponent} from "./componentes/reserva/reserva.component";
import {PropietarioComponent} from "./componentes/propietario/propietario.component";
import {ServicioPeluComponent} from "./componentes/servicio-pelu/servicio-pelu.component";
import {AboutusComponent} from "./componentes/aboutus/aboutus.component";
import {LoginComponent} from "./componentes/login/login.component";


const appRoutes:Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'serviciopelu', component: ServicioPeluComponent },
      { path: 'aboutus', component: AboutusComponent }
    ]
  },
  { path: 'login', loadChildren: () => import('./componentes/login/login.component')
      .then(m => m.LoginComponent) },
  {path: 'reserva', component:ReservaComponent},
  {path: 'propietario', component:PropietarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes),
    RouterModule.forChild(appRoutes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
