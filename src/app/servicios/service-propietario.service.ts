import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ReservaModelo} from "../modelos/Reserva.modelo";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServicePropietarioService {

  constructor(private http: HttpClient) {

  }


  getAllReservas() {
    return this.http.get<any[]>('http://localhost:8080/reserva/all')
      .pipe(
        map(data => {
          return data.map(item => {

            const reserva = new ReservaModelo(
              item.idreserva,
              item.hora,
              new Date(item.fecha),
              item.cliente,
              item.servicio,
            );
            return reserva;


          });
        })
      );
  }


}


