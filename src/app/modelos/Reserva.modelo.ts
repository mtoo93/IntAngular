import {ClienteModelo} from "./Cliente.modelo";
import {ServicioModelo} from "./Servicio.model";

export class ReservaModelo{

  constructor(
    public idreserva: number | null,
    public hora: Date,
    public fecha: Date,
    public cliente: ClienteModelo,
    public servicio: ServicioModelo)
  {}



}
