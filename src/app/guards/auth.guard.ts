import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const activo = localStorage.getItem('usuarioActivo');
    if (activo === 'true') {
      return true;
    } else {
      await this.router.navigate(['/login']);
      return false;
    }
  }
}
