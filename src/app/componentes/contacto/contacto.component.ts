import {Component, EventEmitter, Output} from '@angular/core';
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  submitContacto() {
    const name = (<HTMLInputElement>document.getElementById("name")).value;
    const namepet = (<HTMLInputElement>document.getElementById("namepet")).value;
    const telefono = (<HTMLInputElement>document.getElementById("telefono")).value;
    const message = (<HTMLInputElement>document.getElementById("message")).value;

    // Crea un nuevo objeto de documento PDF
    const doc = new jsPDF();

    // Agrega el texto del formulario al PDF
    doc.text(`Nombre del dueño: ${name}`, 10, 10);
    doc.text(`Nombre de la mascota: ${namepet}`, 10, 20);
    doc.text(`Telefono: ${telefono}`, 10, 30);
    doc.text(`Consulta: ${message}`, 10, 40);

    // Guarda el archivo PDF
    doc.save('formulario.pdf');

  }
}
