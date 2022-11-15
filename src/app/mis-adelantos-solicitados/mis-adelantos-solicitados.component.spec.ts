import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisAdelantosSolicitadosComponent } from './mis-adelantos-solicitados.component';

describe('MisAdelantosSolicitadosComponent', () => {
  let component: MisAdelantosSolicitadosComponent;
  let fixture: ComponentFixture<MisAdelantosSolicitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisAdelantosSolicitadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisAdelantosSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
