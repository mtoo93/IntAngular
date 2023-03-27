import {Component, EventEmitter, Output} from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {


  public sendEmail(e: Event) {
      e.preventDefault();
      emailjs.sendForm('service_itmaux6', 'template_tttxkji', e.target as HTMLFormElement, 'xQiFc9hV_jgdmlaK1')
        .then((result: EmailJSResponseStatus) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
    }

}
