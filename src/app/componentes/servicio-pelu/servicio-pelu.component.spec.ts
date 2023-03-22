import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioPeluComponent } from './servicio-pelu.component';

describe('ServicioPeluComponent', () => {
  let component: ServicioPeluComponent;
  let fixture: ComponentFixture<ServicioPeluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioPeluComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioPeluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
