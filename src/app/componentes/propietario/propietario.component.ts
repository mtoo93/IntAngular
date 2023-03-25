import {Component, OnInit, ViewChild} from '@angular/core';
import {ServicePropietarioService} from "../../servicios/service-propietario.service";
import {ReservaModelo} from "../../modelos/Reserva.modelo";
import {ModalComponent} from "./modal/modal.component";



@Component({

  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit{

constructor(private propietarioService:ServicePropietarioService) {}
  @ViewChild(ModalComponent) modal?: ModalComponent;
  reservas: ReservaModelo[] = [];
currentPage = 0;
pageSize = 0;




  ngOnInit() {
    this.propietarioService.getAllReservas().subscribe((data: ReservaModelo[]) => {
      this.reservas = data;
      console.log(this.reservas);
    });

    this.currentPage = 1;
    this.pageSize = 10;


  }

  get totalPages(): number {
    return Math.ceil(this.reservas.length / this.pageSize);
  }


  openUpdateModal() {
    if (this.modal) {
      this.modal.openModal();
    }
  }

  openDeleteModal() {

  }
}




