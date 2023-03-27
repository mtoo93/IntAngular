import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReservaComponent} from "../../reserva/reserva.component";
import {ServicePropietarioService} from "../../../servicios/service-propietario.service";
import {tap} from "rxjs";
import Swal from "sweetalert2";

declare var bootstrap: any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnChanges {
  constructor(private reservaComponent: ReservaComponent, private formBuilder: FormBuilder, private propietarioService: ServicePropietarioService) {
  }

  @Input() idreserva!: number;
  reservaForm!: FormGroup;

  ngOnChanges(changes: SimpleChanges): void{

    this.reservaForm = this.formBuilder.group({
      namepet: ['', [Validators.required, Validators.maxLength(45)]],
      nameowner: ['', [Validators.required, Validators.maxLength(45)]],
      tel: ['', [Validators.required, Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
      raza: ['', [Validators.required, Validators.maxLength(15)]],
      size: ['', [Validators.required]],
      service: ['', [Validators.required]],
      time: ['', [Validators.compose([Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/), this.reservaComponent.validateDate.bind(this)])]],
      date: ['', [Validators.compose([Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/), this.reservaComponent.validateDate.bind(this)])]],
      details: ['', [Validators.maxLength(45)]]
    });


    if (changes['idreserva'] && changes['idreserva'].currentValue) {
      this.propietarioService.getById(this.idreserva).pipe(
        tap(reserva => {
          console.log(reserva);
          if (reserva) {
            this.reservaForm.patchValue({
              namepet: reserva.cliente.nombreCliente,
              nameowner: reserva.cliente.ownerCliente,
              tel: reserva.cliente.telefono,
              raza: reserva.cliente.raza,
              size: reserva.cliente.size,
              service: reserva.servicio.nombreServicio,
              time: reserva.hora,
              date: reserva.fecha,
              details: reserva.cliente.observaciones
            });
          } else {
            console.log("El objeto reserva es nulo o indefinido.");
          }
        })
      ).subscribe();
    }
  }


  submitReserva(): void {
    const nombreCliente = this.reservaForm.get('namepet')!.value;
    const ownerCliente = this.reservaForm.get('nameowner')!.value;
    const telefono = this.reservaForm.get('tel')!.value;
    const raza = this.reservaForm.get('raza')!.value;
    const size = this.reservaForm.get('size')!.value;
    let nombre_servicio = this.reservaForm.get('service')!.value;
    const fecha = this.reservaForm.get('date')!.value;
    const hora = this.reservaForm.get('time')!.value;
    const observaciones = this.reservaForm.get('details')!.value;
    if (nombre_servicio === "Corte higienico") {
      nombre_servicio = "Corte higienico";
    } else {
      nombre_servicio = nombre_servicio + " " + size;
    }


    const datos = {
      "fecha": fecha,
      "hora": hora,
      "nombreCliente": nombreCliente,
      "ownerCliente": ownerCliente,
      "telefono": telefono,
      "raza": raza,
      "size": size,
      "observaciones": observaciones,
      "nombre_servicio": nombre_servicio
    };
    if (this.idreserva) {
      this.propietarioService.actualizarReserva(this.idreserva, datos).subscribe((response) => {
          Swal.fire({
            title: 'Reserva actualizada!',
            imageUrl: '/assets/smileBulldog.jpg',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })

          // Cerrar modal y recargar lista de reservas
          this.closeModal();
          this.propietarioService.actualizarReserva(this.idreserva, datos).subscribe(() => {
            this.propietarioService.getAllReservas().subscribe();
          });
        },
        (error) => {
          Swal.fire({
            title: 'No se pudo actualizar la reserva',
            text: 'Faltan completar campos',
            imageUrl: '/assets/sadDog.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
          console.log(error);
        });

    }
  }

  openModal() {
    const modalEl = document.getElementById('modal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  closeModal() {
    const modal = document.getElementById('modal');
    modal!.classList.remove('show');
    modal!.style.display = 'none';
    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (modalBackdrop.parentNode !== null) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }

  }
}
