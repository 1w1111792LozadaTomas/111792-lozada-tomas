import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDatosLaboralesComponent } from './mis-datos-laborales.component';

describe('MisDatosLaboralesComponent', () => {
  let component: MisDatosLaboralesComponent;
  let fixture: ComponentFixture<MisDatosLaboralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisDatosLaboralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisDatosLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
