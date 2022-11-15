import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisLicenciasSolicitadasComponent } from './mis-licencias-solicitadas.component';

describe('MisLicenciasSolicitadasComponent', () => {
  let component: MisLicenciasSolicitadasComponent;
  let fixture: ComponentFixture<MisLicenciasSolicitadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisLicenciasSolicitadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisLicenciasSolicitadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
