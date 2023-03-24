import {Component, OnInit} from '@angular/core';
import {ServicePropietarioService} from "../../servicios/service-propietario.service";
import {ReservaModelo} from "../../modelos/Reserva.modelo";


@Component({

  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit{

constructor(private propietarioService:ServicePropietarioService) {}
  reservas: ReservaModelo[] = [];
currentPage = 0;
pageSize = 0;




  ngOnInit() {
    this.propietarioService.getAllReservas().subscribe((data: ReservaModelo[])=> {
      this.reservas = data;
    });
    this.currentPage = 1;
    this.pageSize = 10;


  }
  get totalPages(): number {
    return Math.ceil(this.reservas.length / this.pageSize);
  }







}




