import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecadetailsComponent } from './bibliotecadetails.component';

describe('BibliotecadetailsComponent', () => {
  let component: BibliotecadetailsComponent;
  let fixture: ComponentFixture<BibliotecadetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecadetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BibliotecadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
