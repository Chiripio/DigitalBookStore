import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../services/storage.service';
import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('authGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        StorageService,
        { provide: Storage, useValue: jasmine.createSpyObj('Storage', ['get', 'set', 'remove']) }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
