import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LectorDigitalPage } from './lector-digital.page';

describe('LectorDigitalPage', () => {
  let component: LectorDigitalPage;
  let fixture: ComponentFixture<LectorDigitalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LectorDigitalPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LectorDigitalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
