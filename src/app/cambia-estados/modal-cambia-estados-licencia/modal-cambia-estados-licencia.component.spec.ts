import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambiaEstadosLicenciaComponent } from './modal-cambia-estados-licencia.component';

describe('ModalCambiaEstadosLicenciaComponent', () => {
  let component: ModalCambiaEstadosLicenciaComponent;
  let fixture: ComponentFixture<ModalCambiaEstadosLicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCambiaEstadosLicenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCambiaEstadosLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
