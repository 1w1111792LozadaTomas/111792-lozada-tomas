import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMisMensajesComponent } from './modal-mis-mensajes.component';

describe('ModalMisMensajesComponent', () => {
  let component: ModalMisMensajesComponent;
  let fixture: ComponentFixture<ModalMisMensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMisMensajesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMisMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
