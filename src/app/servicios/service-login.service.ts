import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { AdminModelo } from "../modelos/Admin.model";
import {Observable, tap, throwError} from "rxjs";
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {
  constructor(private http: HttpClient) { }

  sendLogin(admin: AdminModelo): Observable<any> {
    return this.http.post<AdminModelo>('http://localhost:8080/admin/login', admin, { headers: { 'Accept': 'application/json' }, observe: 'response' })
      .pipe(
      map(response => response.body || {}),
      catchError(this.handleError)
    );
  }


   handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error en el servidor';
    if (error.error instanceof ErrorEvent) {
      // Error de red o de cliente
      errorMessage = `Error: ${error.error.message}`;
    } else if (typeof error.error === 'object') {
      // Error del servidor con objeto de respuesta inesperado
      errorMessage = `Error del servidor: ${JSON.stringify(error.error)}`;
    } else if (error.error && typeof error.error === 'string') {
      // Error del servidor con mensaje de respuesta
      errorMessage = `Código de error del servidor: ${error.status}, mensaje: ${error.error}`;
    } else {
      // Otros errores del servidor
      errorMessage = `Código de error del servidor: ${error.status}`;
    }
    return throwError(errorMessage);
  }
}
