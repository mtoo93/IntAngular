import {Component, ViewChild} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import { Router } from '@angular/router';
import {ContactoComponent} from "../contacto/contacto.component";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @ViewChild(ContactoComponent) contactoModal!: ContactoComponent;
  constructor(public loginComponent: LoginComponent,private router: Router) {
  }
  openModal() {
    this.loginComponent.openModal();
  }
}


