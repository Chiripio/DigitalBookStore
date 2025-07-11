# DigitalBookStore 📚

Este proyecto corresponde a la actividad de la **Semana 8** del curso **Programación de Aplicaciones Móviles (PGY4221)** en Duoc UC. Ha sido desarrollado utilizando **Ionic Framework** con **Angular**, incorporando funcionalidades modernas como almacenamiento local con **SQLite**, geolocalización, consumo de servicios externos (como la API de **OpenWeatherMap**), y pruebas tanto End-to-End (con **Cypress**) como unitarias (con **Jasmine** y **Karma**).

---

## 🔧 Tecnologías y herramientas utilizadas

- **Ionic Framework**: 7.x
- **Angular**: 16.x
- **Capacitor**: 5.x
  - @capacitor-community/sqlite
  - @capacitor/geolocation
  - @capacitor/storage
- **Node.js**: 18.x
- **npm**: 9.x
- **SQLite (versión web + emulador Android)**
- **API externas:**
  - Clima actual (OpenWeatherMap)
- **Cypress** para pruebas End-to-End (E2E)
- **Android Studio** para emulación y generación de APK/AAB
- **Firma con keytool** (APK firmada)

---

## ✨ Funcionalidades principales

- **Inicio de sesión con persistencia de sesión (SQLite + LocalStorage)**
- **Registro de usuario completo**
- **Menú lateral personalizado (logueado e invitado)**
- **Visualización de catálogo de libros**
- **Pantalla de ofertas**
- **Carrito de compras funcional**
- **Pantalla de confirmación de pago**
- **Pantalla con información del clima según IP**
- **Lector de libros digital**
- **Pruebas automatizadas con Cypress**

---

## 📱 Publicación y firma

- Se generaron dos tipos de builds:
  - APK **firmada** usando `keytool` (alias: `digitalbookstore-key`)
  - AAB **firmado** desde Android Studio (modo release)
- Se eliminó la APK de debug para entregar solo el archivo de producción.

---

## 📁 Estructura destacada

- `/src/app` → Contiene componentes, páginas y servicios.
- `/android` → Proyecto Android para compilar APK/AAB.
- `/e2e/` → Pruebas automatizadas con Cypress.
- `.gitignore` → Configurado para excluir `node_modules`, `dist`, `www`, APK, AAB, archivos `.keystore` y más.

---

## 📦 Instalación local

```bash
npm install
ionic build
ionic cap sync
ionic serve
```

---

## 🔐 Firma APK

```bash
keytool -genkey -v -keystore my-release-key.keystore \
  -alias digitalbookstore-key \
  -keyalg RSA -keysize 2048 -validity 10000
```

---

## 🧪 Cypress

```bash
npx cypress open
```

> ℹ️ Durante las pruebas E2E en navegador, **no se usaron mocks explícitos** para SQLite. Sin embargo, la aplicación está preparada para funcionar correctamente gracias a un mecanismo de respaldo que utiliza `LocalStorage` cuando SQLite falla en entornos web. Esto permite simular el comportamiento del login, registro y persistencia de usuario sin acceso real a la base de datos.

Incluye pruebas como:
- Formulario de login
- Validaciones
- Redirección tras login correcto

---

## 🧪 Pruebas Unitarias

Este proyecto incluye pruebas unitarias implementadas con Jasmine y Karma para garantizar el correcto funcionamiento de componentes clave.

Archivos de prueba incluidos:
- `src/app/services/sqlite.service.spec.ts`
- `src/app/pages/login/login.page.spec.ts`

Para ejecutar las pruebas unitarias, usa el siguiente comando:

```bash
npm run test
```

Asegúrate de tener configurado el entorno correctamente antes de ejecutar las pruebas.

---

## 🗃️ Observaciones

- Proyecto probado tanto en navegador como en emulador Android (AVD).
- Persistencia simulada en navegador usando `platform: web`.
- Se implementó `LocalStorage` como respaldo ante errores en SQLite web.

---

## ✅ Recomendaciones para ejecutar correctamente

- Ejecutar `ionic doctor check` para validar el entorno antes de compilar.
- Usar `platform: web` solo como fallback para SQLite en navegador.
- Asegurarse de tener instalado Android Studio y configurado el emulador AVD.
- Instalar dependencias específicas con `npm ci` si se clona el proyecto desde GitHub.
- Para evitar errores al generar el build, eliminar previamente `/www` y usar `ionic build --prod`.
- Revisar permisos de almacenamiento en dispositivos Android reales.

---

## 👤 Autor

**Eduardo Guerrero Soto**  
Analista Programador - Duoc UC  
Julio 2025