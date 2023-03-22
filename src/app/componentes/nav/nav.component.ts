import { Component } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(public loginComponent: LoginComponent,private router: Router) {
  }
  openModal() {
    this.loginComponent.openModal();
  }

}


