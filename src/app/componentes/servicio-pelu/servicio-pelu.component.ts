import {Component, OnInit} from '@angular/core';
import {ServicioModelo} from "../../modelos/Servicio.model";
import {ServicioServiceService} from "../../servicios/servicio-service.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-servicio-pelu',
  templateUrl: './servicio-pelu.component.html',
  styleUrls: ['./servicio-pelu.component.css']
})

export class ServicioPeluComponent implements OnInit{
  servicioBanio: ServicioModelo[] = [];
  servicioCorte: ServicioModelo[] = [];

  servicioHigienico: ServicioModelo[] = [];
  servicioDeslanado:ServicioModelo[] = [];

  servicioCorteyBanio: ServicioModelo[] = [];
  servicioSpa:ServicioModelo[] = [];
  constructor(private servicioService: ServicioServiceService) { }

  ngOnInit(): void {

  }
  cargarServicios(palabra: string) {
    switch (palabra) {
      case 'baño':
        this.servicioService.getNombreEspecifico('baño').subscribe(
          data => {
            this.servicioBanio = data;
          },
          error => {
            console.log(error);
          }
        );
        break;
      case 'corte':
        this.servicioService.getNombreEspecifico('corte').subscribe(
          data => {
            this.servicioCorte = data;
          },
          error => {
            console.log(error);
          }
        );
        break;
      case 'higienico':
        this.servicioService.getNombreEspecifico('higienico').subscribe(
          data => {
            this.servicioHigienico = data;
          },
          error => {
            console.log(error);
          }
        );
        break;
      case 'deslanado':
        this.servicioService.getNombreEspecifico('deslanado').subscribe(
          data => {
            this.servicioDeslanado = data;
          },
          error => {
            console.log(error);
          }
        );
        break;
      case 'corteybanio':
        this.servicioService.getNombreEspecifico('corte').subscribe(
          data => {
            this.servicioCorteyBanio = data.filter((servicio: { nombreServicio: string[]; }) => servicio.nombreServicio.includes('corte') && servicio.nombreServicio.includes('baño'));
          },
          error => {
            console.log(error);
          }
        );
        break;
      case 'spa':
        this.servicioService.getNombreEspecifico('spa').subscribe(
          data => {
            this.servicioSpa = data;
          },
          error => {
            console.log(error);
          }
        );
        break;
      default:
        console.log('Palabra no válida');
        break;
    }
  }

}
