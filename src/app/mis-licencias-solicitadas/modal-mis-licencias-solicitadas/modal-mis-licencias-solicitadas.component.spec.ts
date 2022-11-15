import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMisLicenciasSolicitadasComponent } from './modal-mis-licencias-solicitadas.component';

describe('ModalMisLicenciasSolicitadasComponent', () => {
  let component: ModalMisLicenciasSolicitadasComponent;
  let fixture: ComponentFixture<ModalMisLicenciasSolicitadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMisLicenciasSolicitadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMisLicenciasSolicitadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
