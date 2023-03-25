import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReservaModelo} from "../modelos/Reserva.modelo";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicePropietarioService {

  constructor(private http: HttpClient) {

  }


  getAllReservas() {
    return this.http.get<any[]>('http://localhost:8080/reserva/all').pipe(
      map(data => {
        console.log(data);
        return data.map(item => {
          const fecha = new Date(item.fecha);
          const hora = item.hora.split(':');
          fecha.setHours(Number(hora[0]));
          fecha.setMinutes(Number(hora[1]));
          fecha.setSeconds(0);
          return new ReservaModelo(
            item.idreserva,
            item.hora,
            fecha,
            item.cliente,
            item.servicio,
          );
        }).sort((a, b) => {
          return a.fecha.getTime() - b.fecha.getTime();
        });
      })
    );
  }

  updateReserva(idreserva: number, reserva: ReservaModelo): Observable<ReservaModelo> {
    return this.http.put<ReservaModelo>(`http://localhost:8080/reserva/add/${idreserva}`, reserva);
  }

}


