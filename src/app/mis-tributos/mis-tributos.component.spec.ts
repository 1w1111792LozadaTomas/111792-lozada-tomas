import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTributosComponent } from './mis-tributos.component';

describe('MisTributosComponent', () => {
  let component: MisTributosComponent;
  let fixture: ComponentFixture<MisTributosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisTributosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisTributosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
