import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private ionicStorage: Storage) {
    this.init();
  }

  async init() {
    // Crea el almacenamiento si aún no existe
    const storage = await this.ionicStorage.create();
    this._storage = storage;
  }

  // Guardar un valor
  public async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  // Obtener un valor
  public async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  // Eliminar un valor
  public async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  // Limpiar todo
  public async clear(): Promise<void> {
    await this._storage?.clear();
  }
  // Obtener todos los usuarios guardados en Storage (clave 'usuarios')
  public async getUsuarios(): Promise<any[]> {
    const usuarios = await this._storage?.get('usuarios');
    return usuarios || [];
  }
}
