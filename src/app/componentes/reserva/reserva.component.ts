import {Component, OnInit} from '@angular/core';
import {ServiceReservaService} from "../../servicios/service-reserva.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {tap, throwError} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  constructor(private serviceReserva: ServiceReservaService, private formBuilder: FormBuilder, private router: Router) {
  }

  reservaForm!: FormGroup;



  ngOnInit(): void {
    this.reservaForm = this.formBuilder.group({
      namepet: ['', [Validators.required, Validators.maxLength(45)]],
      nameowner: ['', [Validators.required, Validators.maxLength(45)]],
      tel: ['', [Validators.required, Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
      raza: ['', [Validators.required, Validators.maxLength(15)]],
      size: ['', [Validators.required]],
      service: ['', [Validators.required]],
      time: ['', [Validators.compose([Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/), this.validateDate.bind(this)])]],
      date: ['', [Validators.compose([Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/), this.validateDate.bind(this)])]],
      details: ['', [Validators.maxLength(45)]]
    });
  }




  validateDate(control: AbstractControl): { [key: string]: any } | null {

    //Validadores de fecha

      const selectedDateTime = new Date(control.value);
      const now = new Date();
      const dateMax = new Date();
      const selectedDay = selectedDateTime.getDay();
      const isWeekend = selectedDay === 0 || selectedDay === 6;
      dateMax.setFullYear(dateMax.getFullYear() + 5);
      if (selectedDateTime < now) {
      return {'dateInvalid': true};
      }
      if (selectedDateTime > dateMax) {
      return {'dateMax': true};
      }
      if (isWeekend){
      return {'dateWeekend': true};
      }

      //Validadores de horario

    const [hours, minutes] = control.value.split(':').map(Number);
    const selectedTime = hours * 60 + minutes;
    const lowerLimit = 9 * 60;
    const upperLimit = 17 * 60;
    const isWorkingHours = selectedTime >= lowerLimit && selectedTime < upperLimit;
    if (!isWorkingHours) {
      return {'timeInvalid': true};
    }

    return null;
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


    const reserva = {
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


    console.log(reserva);
    this.serviceReserva.createReserva(reserva).pipe(
      tap(response => {
        console.log(response);
        Swal.fire({
          title: 'Reserva creada!',
          text: 'Gracias por usar nuestros servicios',
          imageUrl: '/assets/smileBulldog.jpg',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
          this.router.navigate(['/']);

      }),
      catchError(error => {
        console.log(error);
        Swal.fire({
          title: 'No se pudo crear la reserva',
          text: 'Faltan completar campos',
          imageUrl: '/assets/sadDog.jpg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })

        return throwError(error);
      })

    ).subscribe();
  }

}

