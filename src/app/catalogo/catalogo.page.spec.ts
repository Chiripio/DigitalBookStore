import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoPage } from './catalogo.page';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../services/storage.service';

describe('CatalogoPage', () => {
  let component: CatalogoPage;
  let fixture: ComponentFixture<CatalogoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoPage],
      providers: [
        StorageService,
        {
          provide: Storage,
          useValue: {
            create: () => Promise.resolve(),
            get: jasmine.createSpy('get'),
            set: jasmine.createSpy('set'),
            remove: jasmine.createSpy('remove'),
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
