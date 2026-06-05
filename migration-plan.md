# Migration plan — Reorganización de proyecto MERN

Fecha: 2026-06-05

Propósito
- Proponer y documentar los pasos para reorganizar `e-commerce-backend` y `e-commerce-frontend` hacia una estructura más profesional (MVC y separación de responsabilidades) sin cambiar dependencias.

Principios
- Mantener historial de Git usando `git mv` para preservar renames.
- Crear stubs de controllers/services al mover rutas para evitar ruptura inmediata.
- Aplicar cambios incrementalmente y verificar con los scripts existentes (`npm run dev`, `npm start`).

Resumen de estructura objetivo

Backend (objetivo)
- `e-commerce-backend/src/`
  - `src/index.js` (arranque, antes `server.js`)
  - `src/config/connection.js` (antes `connection.js`)
  - `src/controllers/` (HTTP handlers)
  - `src/services/` (lógica de negocio / acceso datos)
  - `src/models/` (Mongoose models)
  - `src/routes/` (Express routers que usan controllers)
  - `src/middlewares/` (auth, errorHandler, validate)
  - `src/utils/` (logger, helpers)
  - `tests/` (pruebas)

Frontend (objetivo)
- `e-commerce-frontend/src/`
  - `src/services/api.js` (axios wrapper, antes `services/appApi.js`)
  - `src/store/` (inicializador del store, antes `store.js`)
  - `src/components/` (subcarpetas por dominio: Checkout, Admin, Shared)
  - `src/pages/` (vistas/rutas)
  - `src/features/` (slices redux existentes)
  - `src/hooks/`, `src/utils/`, `src/assets/`, `src/styles/`, `src/routes/`

Mapeo detallado (actual → objetivo)

Backend
- `server.js` → `src/index.js`
- `connection.js` → `src/config/connection.js`
- `models/*.js` → `src/models/<same>.js`
- `routes/*.js` → `src/routes/<same>.js` (cada archivo de rutas debe delegar a un controller nueva)

Recomendación de refactor mínima al migrar una ruta
1. Mover `routes/ProductRoutes.js` → `src/routes/ProductRoutes.js` con `module.exports = router` intacto.
2. Crear `src/controllers/productController.js` con funciones stub que importen `services/productService.js`.
3. Crear `src/services/productService.js` que exporte funciones que invoquen a los models.
4. Actualizar la importación en `src/routes/ProductRoutes.js` para usar `controllers/productController`.

Frontend
- `src/services/appApi.js` → `src/services/api.js`
- `src/store.js` → `src/store/index.js`
- Componentes de `src/components/*` → mover a carpetas por dominio (ej.: `src/components/Checkout/CheckoutForm.js`)
- Mantener `features/*.js` en `src/features/`.

Comandos sugeridos (PowerShell)

Crear carpetas (backend):
```powershell
cd e-commerce-backend
mkdir src; mkdir src\controllers; mkdir src\services; mkdir src\routes; mkdir src\models; mkdir src\config; mkdir src\middlewares; mkdir src\utils; mkdir tests
```

Mover archivos preservando git history (backend):
```powershell
git mv server.js src\index.js
git mv connection.js src\config\connection.js
git mv models\*.js src\models\
git mv routes\*.js src\routes\
```

Crear stubs (PowerShell) — ejemplo para Product:
```powershell
New-Item -Path src\controllers -Name productController.js -ItemType File -Force
New-Item -Path src\services -Name productService.js -ItemType File -Force
```

Ejemplo mínimo de contenido (añadir manualmente o copiar después de mover):
- `src/controllers/productController.js` debe exportar funciones: `getAll`, `getById`, `create`, `update`, `delete` que llamen a `productService` y manejen `req,res,next`.
- `src/services/productService.js` debe exportar la lógica que interactúa con `src/models/Product.js`.

Frontend commands (PowerShell)
```powershell
cd e-commerce-frontend
mkdir src\services; mkdir src\hooks; mkdir src\utils; mkdir src\assets; mkdir src\styles; mkdir src\routes; mkdir src\store
git mv src\services\appApi.js src\services\api.js
git mv src\store.js src\store\index.js
# mover componentes por dominio, ejemplo:
git mv src\components\CheckoutForm.js src\components\Checkout\CheckoutForm.js
```

Verificación y testing
- Backend: `npm run dev` desde `e-commerce-backend` (verificar arranque y errores de import). Ajustar `require`/`import` paths a `./src/...` si es necesario.
- Frontend: `npm start` desde `e-commerce-frontend`.
- Ejecutar manualmente rutas clave con `curl` o Postman; validar que la UI carga y que las llamadas fetch a la API funcionan.

Riesgos y mitigación
- Import paths rotos: mover con `git mv` reduce riesgo; crear stubs ayuda a reiniciar rápidamente.
- Variables de entorno faltantes: documentar en `.env.example` y pedir al equipo que rellene `.env`.
- Tests: ejecutar pruebas unitarias donde existan; si no hay, agregar smoke tests manuales para rutas principales.

Rollback
- Si algo falla, revertir el commit: `git reset --hard HEAD~1` (o usar `git checkout -- <path>` para archivos individuales).

Checklist antes de merge
- [ ] Crear `.env.example` con claves necesarias.
- [ ] Mover archivos con `git mv` y añadir stubs donde haga falta.
- [ ] Actualizar `require`/`import` paths y probar `npm run dev`.
- [ ] Ejecutar `npm start` en frontend y verificar console/network.
- [ ] Añadir README corto en cada `src/` explicando la convención.

Próximo paso sugerido
- Si confirmas, aplico los `git mv` y creo los stubs para el backend y frontend en un commit separado, luego arranco ambos servicios y arreglo cualquier path roto.
