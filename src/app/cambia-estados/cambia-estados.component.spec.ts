import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiaEstadosComponent } from './cambia-estados.component';

describe('CambiaEstadosComponent', () => {
  let component: CambiaEstadosComponent;
  let fixture: ComponentFixture<CambiaEstadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiaEstadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiaEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
