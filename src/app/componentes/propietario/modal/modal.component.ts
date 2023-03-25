import { Component } from '@angular/core';

declare var bootstrap: any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor() {
  }

  openModal() {
    const modalEl = document.getElementById('modal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

}
