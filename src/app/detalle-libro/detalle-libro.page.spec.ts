import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleLibroPage } from './detalle-libro.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DetalleLibroPage', () => {
  let component: DetalleLibroPage;
  let fixture: ComponentFixture<DetalleLibroPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [DetalleLibroPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => {
                if (key === 'id') return '123';
                return null;
              }
            }),
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') return '123';
                  return null;
                }
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleLibroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
