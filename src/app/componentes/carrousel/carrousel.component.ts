import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
// ------------------- CARROUSEL ------------------- //

// Obtengo los elementos del carrousel
    const sliders: Element[] = Array.from(document.querySelectorAll('.slider_body'));
    const arrowNext: Element = document.querySelector('#before')!;
    const arrowBefore: Element = document.querySelector('#after')!;
    let value: number;

// Capturo el evento "click" de las flechas y llamo a una funcion para cambiar de posicion.
    arrowNext.addEventListener('click', () => changePosition(1));
    arrowBefore.addEventListener('click', () => changePosition(-1));

    function changePosition(change: number) {
// console.log(change)

// Obtengo el elemento actual y su dataset id
      const currentElement: number = Number(document.querySelector('.slider_body--show')?.getAttribute('data-id'));

      value = currentElement;

      value += change;

      if (value === 0 || value === sliders.length + 1) {
        value = value === 0 ? sliders.length : 1;
      }

      sliders[currentElement - 1]?.classList.toggle('slider_body--show');
      sliders[value - 1]?.classList.toggle('slider_body--show');
    }
  }
}
