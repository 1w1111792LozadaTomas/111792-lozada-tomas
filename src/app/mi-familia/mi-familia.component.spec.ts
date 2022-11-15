import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiFamiliaComponent } from './mi-familia.component';

describe('MiFamiliaComponent', () => {
  let component: MiFamiliaComponent;
  let fixture: ComponentFixture<MiFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiFamiliaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
