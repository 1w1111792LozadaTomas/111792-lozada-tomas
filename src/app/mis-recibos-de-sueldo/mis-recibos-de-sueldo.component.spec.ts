import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRecibosDeSueldoComponent } from './mis-recibos-de-sueldo.component';

describe('MisRecibosDeSueldoComponent', () => {
  let component: MisRecibosDeSueldoComponent;
  let fixture: ComponentFixture<MisRecibosDeSueldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisRecibosDeSueldoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisRecibosDeSueldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
