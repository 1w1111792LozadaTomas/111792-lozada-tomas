import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMisAdelantosSolicitadosDetallesComponent } from './modal-mis-adelantos-solicitados-detalles.component';

describe('ModalMisAdelantosSolicitadosDetallesComponent', () => {
  let component: ModalMisAdelantosSolicitadosDetallesComponent;
  let fixture: ComponentFixture<ModalMisAdelantosSolicitadosDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMisAdelantosSolicitadosDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMisAdelantosSolicitadosDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
