import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilUsuarioPage } from './perfil-usuario.page';
import { Storage } from '@ionic/storage-angular';

const storageSpy = jasmine.createSpyObj('Storage', ['get', 'set', 'remove', 'clear', 'create']);

describe('PerfilUsuarioPage', () => {
  let component: PerfilUsuarioPage;
  let fixture: ComponentFixture<PerfilUsuarioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: storageSpy }
      ]
    });
    fixture = TestBed.createComponent(PerfilUsuarioPage);
    component = fixture.componentInstance;
    component.usuario = { nombre: 'Usuario Prueba', correo: 'prueba@example.com' }; // Simulación básica
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default profile picture', () => {
    expect(component.fotoPerfil).toBe('assets/avatar-default.png');
  });

  it('should initialize with usuarioLogueado as false', () => {
    expect(component.usuarioLogueado).toBeFalse();
  });

  it('should initialize nuevaContrasena and confirmarContrasena as empty', () => {
    expect(component.nuevaContrasena).toBe('');
    expect(component.confirmarContrasena).toBe('');
  });
});
