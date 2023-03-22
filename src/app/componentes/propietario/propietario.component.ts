import { Component } from '@angular/core';
import {ServicePropietarioService} from "../../servicios/service-propietario.service";


@Component({

  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent {
constructor(private propietarioService:ServicePropietarioService) {
}
}




