import { Component } from '@angular/core';
import {ServiceLoginService} from "./servicios/service-login.service";
import {ServiceReservaService} from "./servicios/service-reserva.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PeluqCanina';
}

