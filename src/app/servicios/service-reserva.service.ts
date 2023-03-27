import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {ServiceLoginService} from "./service-login.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceReservaService {

  constructor(private http: HttpClient, private serviceLogin: ServiceLoginService) { }

  createReserva(reserva: any): Observable<any> {
    return this.http.post('http://localhost:8080/reserva/add', reserva, { observe: 'response', withCredentials: true })
      .pipe(
        map(response => response.body),
        catchError(this.serviceLogin.handleError)
      );

  }


}

