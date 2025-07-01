import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private platform: string = '';

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.platform = Capacitor.getPlatform(); // 'android', 'ios' o 'web'
  }

  async initDB() {
    try {
      if (this.platform === 'web') {
        await this.sqlite.initWebStore();
      }

      this.db = await this.sqlite.createConnection('librosDB', false, 'no-encryption', 1, false);
      await this.db.open();
      console.log('[SQLite] DB abierta correctamente');
    } catch (err) {
      console.error('[SQLite] Error al iniciar DB', err);
    }
  }

  async createUsuariosTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        apellido TEXT,
        correo TEXT UNIQUE,
        contrasena TEXT,
        confirmar_contrasena TEXT,
        nivel_estudio TEXT,
        fecha_nacimiento TEXT
      );
    `;
    await this.db?.execute(query);
  }

  async insertLibro(libro: { id: number, titulo: string, autor: string, imagen: string }) {
    const stmt = 'INSERT INTO libros (id, titulo, autor, imagen) VALUES (?, ?, ?, ?)';
    const values = [libro.id, libro.titulo, libro.autor, libro.imagen];
    await this.db?.run(stmt, values);
  }

  async getLibros(): Promise<any[]> {
    const res = await this.db?.query('SELECT * FROM libros');
    return res?.values || [];
  }
  async insertUsuario(usuario: {
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    confirmar_contrasena: string;
    nivel_estudio: string;
    fecha_nacimiento: string;
  }) {
    console.log('📥 insertUsuario() llamado con:', usuario);
    const stmt = `
      INSERT INTO usuarios (nombre, apellido, correo, contrasena, confirmar_contrasena, nivel_estudio, fecha_nacimiento)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    usuario.fecha_nacimiento = new Date(usuario.fecha_nacimiento).toISOString();
    const values = [
      usuario.nombre,
      usuario.apellido,
      usuario.correo,
      usuario.contrasena,
      usuario.confirmar_contrasena,
      usuario.nivel_estudio,
      usuario.fecha_nacimiento
    ];
    try {
      await this.db?.run(stmt, values);
      console.log('[SQLite] Usuario insertado correctamente');
    } catch (err) {
      console.error('[SQLite] Error al insertar usuario:', err);
    }
    console.log('[SQLite] Datos insertados:', usuario);
    const res = await this.db?.query('SELECT * FROM usuarios');
    console.log('[SQLite] Todos los usuarios después del insert:', res?.values);
  }

  async getAllUsuarios(): Promise<any[]> {
    try {
      const res = await this.db?.query('SELECT * FROM usuarios');
      console.log('[SQLite] Usuarios en DB:', res?.values);
      return res?.values || [];
    } catch (err) {
      console.error('[SQLite] Error al obtener usuarios:', err);
      return [];
    }
  }

  async getUsuarioPorCredenciales(correo: string, contrasena: string): Promise<any | null> {
    try {
      const query = `
        SELECT * FROM usuarios
        WHERE LOWER(correo) = ? AND contrasena = ?
        LIMIT 1
      `;
      const values = [correo.toLowerCase(), contrasena];
      console.log('[SQLite] Buscando usuario con:', values);
      const res = await this.db?.query(query, values);
      console.log('[SQLite] Resultado de búsqueda:', res?.values);
      if (res?.values && res.values.length > 0) {
        return res.values[0];
      }
      return null;
    } catch (err) {
      console.error('[SQLite] Error en getUsuarioPorCredenciales:', err);
      return null;
    }
  }
}
