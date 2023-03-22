import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { ReservaComponent } from './componentes/reserva/reserva.component';
import { PropietarioComponent } from './componentes/propietario/propietario.component';
import { NavComponent } from './componentes/nav/nav.component';
import { LoginComponent } from './componentes/login/login.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ServicioPeluComponent } from './componentes/servicio-pelu/servicio-pelu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CarrouselComponent } from './componentes/carrousel/carrousel.component';
import {ServiceReservaService} from "./servicios/service-reserva.service";
import {ServiceLoginService} from "./servicios/service-login.service";
import {ServicePropietarioService} from "./servicios/service-propietario.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AboutusComponent } from './componentes/aboutus/aboutus.component';
import {CommonModule, DatePipe} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    ReservaComponent,
    PropietarioComponent,
    NavComponent,
    LoginComponent,
    FooterComponent,
    ServicioPeluComponent,
    CarrouselComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [
    LoginComponent,
    ServiceReservaService,
  ServiceLoginService,
  ServicePropietarioService,
  DatePipe]
})
export class AppModule { }
