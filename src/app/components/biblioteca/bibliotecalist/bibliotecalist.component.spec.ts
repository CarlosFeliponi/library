import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecalistComponent } from './bibliotecalist.component';

describe('BibliotecalistComponent', () => {
  let component: BibliotecalistComponent;
  let fixture: ComponentFixture<BibliotecalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecalistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BibliotecalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
