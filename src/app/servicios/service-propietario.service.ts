import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ReservaModelo} from "../modelos/Reserva.modelo";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

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

  actualizarReserva(id: number, datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(`http://localhost:8080/reserva/${id}`, datos, httpOptions)
      .pipe(
        map(response => {
          console.log('Petición exitosa:', response);
          return response;
        }),
        catchError(error => {
          console.log('Error en la petición:', error);
          return throwError(error);
        })
      );
  }

  getById(id:number):Observable<ReservaModelo>{
    return this.http
      .get<ReservaModelo>('http://localhost:8080/reserva/all/'+id);
  }

  borrarReserva(id: number): Observable<any> {

    return this.http.delete('http://localhost:8080/reserva/'+id);
  }
}


