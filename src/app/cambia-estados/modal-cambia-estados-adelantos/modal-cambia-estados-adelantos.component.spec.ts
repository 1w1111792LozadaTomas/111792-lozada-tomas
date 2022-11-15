import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambiaEstadosAdelantosComponent } from './modal-cambia-estados-adelantos.component';

describe('ModalCambiaEstadosAdelantosComponent', () => {
  let component: ModalCambiaEstadosAdelantosComponent;
  let fixture: ComponentFixture<ModalCambiaEstadosAdelantosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCambiaEstadosAdelantosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCambiaEstadosAdelantosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
