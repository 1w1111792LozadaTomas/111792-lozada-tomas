import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGrupoFamiliarComponent } from './modal-grupo-familiar.component';

describe('ModalGrupoFamiliarComponent', () => {
  let component: ModalGrupoFamiliarComponent;
  let fixture: ComponentFixture<ModalGrupoFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGrupoFamiliarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGrupoFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
