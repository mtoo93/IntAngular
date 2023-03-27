import {Component, OnInit, ViewChild} from '@angular/core';
import {ServicePropietarioService} from "../../servicios/service-propietario.service";
import {ReservaModelo} from "../../modelos/Reserva.modelo";
import {ModalComponent} from "./modal/modal.component";
import Swal from "sweetalert2";



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
  idreserva!: number;
  isNotNull(value: any): value is number {
    return value !== null;
  }

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

  onOpenModal(idreserva: number) {
    this.idreserva = idreserva;
    console.log(this.idreserva)
    this.modal?.openModal();
  }
  deleteModal(idreserva:number) {
    Swal.fire({
      title: 'Queres borrar la reserva?',
      text: "No se puede revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.propietarioService.borrarReserva(idreserva)
          .subscribe(
            () => {
              console.log('Reserva eliminada');
              Swal.fire(
                'Reserva borrada',
                'La reserva ha sido eliminada exitosamente',
                'success'
              );
            },
            error => console.error(error)
          );
      }
    });
  }
}




