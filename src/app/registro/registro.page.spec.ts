import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { StorageService } from '../services/storage.service';
import { Storage } from '@ionic/storage-angular';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPage],
      providers: [
        StorageService,
        { 
          provide: Storage, 
          useValue: { 
            create: () => Promise.resolve(), 
            get: jasmine.createSpy('get'), 
            set: jasmine.createSpy('set'), 
            remove: jasmine.createSpy('remove') 
          } 
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
