import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiendasPage } from './tiendas.page';

describe('TiendasPage', () => {
  let component: TiendasPage;
  let fixture: ComponentFixture<TiendasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
