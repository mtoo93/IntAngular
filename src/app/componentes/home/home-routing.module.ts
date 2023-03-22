import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {AboutusComponent} from "../aboutus/aboutus.component";
import {ServicioPeluComponent} from "../servicio-pelu/servicio-pelu.component";



const homeRoutes:Routes = [

];
@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
