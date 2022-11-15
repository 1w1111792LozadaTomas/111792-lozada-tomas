import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMisAdelantosSolicitadosComponent } from './modal-mis-adelantos-solicitados.component';

describe('ModalMisAdelantosSolicitadosComponent', () => {
  let component: ModalMisAdelantosSolicitadosComponent;
  let fixture: ComponentFixture<ModalMisAdelantosSolicitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMisAdelantosSolicitadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMisAdelantosSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
