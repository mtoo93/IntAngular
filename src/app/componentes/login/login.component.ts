import { Component } from '@angular/core';
import { ServiceLoginService } from "../../servicios/service-login.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AdminModelo } from "../../modelos/Admin.model";
import { map} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private serviceLogin: ServiceLoginService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    });
  }

  loginForm: FormGroup;
  credencialesInvalidas: boolean = false;


  onSubmit(): void {
    const username = this.loginForm.get('user')!.value;
    const pass = this.loginForm.get('pass')!.value;
    const admin = new AdminModelo(username, pass);
    this.serviceLogin.sendLogin(admin).pipe(
      map(admin => {
        if (admin.username) {
          this.router.navigate(['/propietario']);
          localStorage.setItem('username', admin.username);
          this.closeModal();
        } else {
          this.credencialesInvalidas = true;
        }
      }),
    ).subscribe();
  }

  openModal() {

    let modal = document.getElementById('id01');

    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    let modal = document.getElementById('id01');

    if (modal) {
      modal.style.display = 'none';
    }
  }
}


