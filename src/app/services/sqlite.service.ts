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
      if (!this.sqlite) {
        this.sqlite = new SQLiteConnection(CapacitorSQLite);
      }

      const isAvailable = CapacitorSQLite && typeof CapacitorSQLite.createConnection === 'function';
      if (!isAvailable) {
        console.error('[SQLite] Plugin no disponible');
        this.db = null;
        return;
      }

      const isConnection = (await this.sqlite.isConnection('librosDB', false)).result;
      if (!isConnection) {
        this.db = await this.sqlite.createConnection('librosDB', false, 'no-encryption', 1, false);
        await this.db.open();
        console.log('[SQLite] DB abierta correctamente');
      } else {
        this.db = await this.sqlite.retrieveConnection('librosDB', false);
        if (this.db) {
          console.log('[SQLite] Conexión reutilizada');
        }
      }
    } catch (err) {
      console.error('[SQLite] Error al iniciar DB', err);
      this.db = null;
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
    console.log('[SQLite] Tabla de usuarios creada/verificada');

    // ⚠️ Verifica si ya existe el usuario admin@admin.com
    const existe = await this.db?.query('SELECT * FROM usuarios WHERE correo = ?', ['admin@admin.com']);
    if (existe?.values?.length === 0) {
      const stmt = `
        INSERT INTO usuarios (nombre, apellido, correo, contrasena, confirmar_contrasena, nivel_estudio, fecha_nacimiento)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        'Eduardo',
        'Guerrero',
        'admin@admin.com',
        '123456',
        '123456',
        'Superior',
        new Date('1990-01-01').toISOString()
      ];
      await this.db?.run(stmt, values);
      console.log('[SQLite] Usuario por defecto insertado: admin@admin.com / 123456');
    }
  }

  async insertLibro(libro: { id: number, titulo: string, autor: string, imagen: string }) {
    if (!this.db) {
      await this.initDB();
    }
    const stmt = 'INSERT INTO libros (id, titulo, autor, imagen) VALUES (?, ?, ?, ?)';
    const values = [libro.id, libro.titulo, libro.autor, libro.imagen];
    await this.db?.run(stmt, values);
  }

  async getLibros(): Promise<any[]> {
    if (!this.db) {
      await this.initDB();
    }
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
    if (!this.db) {
      await this.initDB();
    }
    if (!this.isDBOpen()) {
      console.error('[SQLite] La base de datos no está abierta');
      return null;
    }
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
    const res = await this.db?.query('SELECT * FROM usuarios');
    return res?.values ?? [];
  }

  async getAllUsuarios(): Promise<any[]> {
    if (!this.db) {
      await this.initDB();
    }
    if (!this.isDBOpen()) {
      console.error('[SQLite] La base de datos no está abierta');
      return [];
    }
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
    if (!this.db) {
      await this.initDB();
    }
    if (!this.isDBOpen()) {
      console.error('[SQLite] La base de datos no está abierta');
      return null;
    }
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

  isDBOpen(): boolean {
    return this.db !== null;
  }
}
