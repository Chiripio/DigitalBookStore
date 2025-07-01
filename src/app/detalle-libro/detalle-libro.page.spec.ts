import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleLibroPage } from './detalle-libro.page';

describe('DetalleLibroPage', () => {
  let component: DetalleLibroPage;
  let fixture: ComponentFixture<DetalleLibroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleLibroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
