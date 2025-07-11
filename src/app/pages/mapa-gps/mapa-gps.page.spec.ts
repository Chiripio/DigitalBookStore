import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MapaGpsPage } from './mapa-gps.page';

describe('MapaGpsPage', () => {
  let component: MapaGpsPage;
  let fixture: ComponentFixture<MapaGpsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapaGpsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaGpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
