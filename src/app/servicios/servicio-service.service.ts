import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ServicioModelo} from "../modelos/Servicio.model";

@Injectable({
  providedIn: 'root'
})
export class ServicioServiceService {

  constructor(private http: HttpClient) { }


  getNombreEspecifico(palabra: string): Observable<any> {
    return this.http.get<ServicioModelo>('http://localhost:8080/servicio/all/nombre/'+palabra);
  }
}
