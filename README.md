# UDC Marketplace - Frontend 🛒🎓

Frontend moderno, responsivo y completamente tipado para el **Marketplace Universitario de la Universidad de Cartagena (UDC)**, desarrollado en **React 18 + Vite + TypeScript** con componentes estilizados bajo la estética **shadcn/ui** y **Tailwind CSS**.

Este frontend está diseñado para comunicarse directamente con el backend desarrollado en Go (`udc-go-marketplace`).

---

## 🌟 Características Principales

- **Autenticación Universitaria Completa**:
  - Registro con campos institucionales (`Nombre/Title`, `Correo institucional`, `Código estudiantil`, `Sede UDC`, `Rol`, `Celular`).
  - Inicio de sesión con almacenamiento seguro de Token JWT y decodificación de credenciales.
  - Botón de auto-completado de prueba para testing rápido.

- **Explorador y Catálogo de Artículos**:
  - Filtros rápidos por Campus de la UDC (*Zaragocilla, Piedra de Bolívar, San Agustín, San Pablo, Ceres Turbaco, Ceres Magangué, etc.*).
  - Filtros por Categoría (*Libros, Calculadoras y Tecnología, Batas y Uniformes, Habitaciones y Alquiler, Tutorías, etc.*).
  - Búsqueda en tiempo real por palabra clave y rango de precios en Pesos Colombianos ($ COP).
  - Ordenamiento por más recientes o precio.

- **Publicación Multimodal (Fotos + Datos)**:
  - Formulario de creación conectado a `POST /post/create` con `multipart/form-data`.
  - Subida múltiple de imágenes con arrastrar y soltar (Drag & Drop), previsualización en tiempo real y selector de foto de portada.

- **Detalle de Publicación y Trato Directo**:
  - Galería de fotos con visor en alta resolución.
  - Botón directo de **Contacto por WhatsApp** con mensaje pre-rellenado para el estudiante vendedor.
  - Sección de Valoraciones y Reseñas conectada a `POST /valoration/send`.

- **Gestión de Publicaciones Propias**:
  - Panel "Mis Publicaciones" para listar artículos creados por el usuario.
  - Edición en ventana modal conectada a `PUT /post/:id/update`.
  - Eliminación con modal de confirmación conectada a `DELETE /post/:id/delete`.

- **Dockerización de Producción**:
  - `Dockerfile` multi-stage (Node 22 Builder + Nginx Alpine Server).
  - `nginx.conf` optimizado con compresión Gzip y soporte para enrutamiento SPA.

---

## 🚀 Cómo Ejecutar en Desarrollo

### Requisitos
- Node.js 18+ o 22+
- npm o pnpm

### Pasos
```bash
# 1. Entrar al directorio
cd /home/javiercuesta/dev/udc-marketplace-frontend

# 2. Instalar dependencias (si no se han instalado)
npm install

# 3. Iniciar el servidor de desarrollo Vite
npm run dev
```

El frontend estará disponible en `http://localhost:3000`.

---

## 🐳 Cómo Ejecutar con Docker

### Construir la imagen Docker:
```bash
docker build -t udc-marketplace-frontend .
```

### Ejecutar el contenedor:
```bash
docker run -d -p 3000:80 --name udc-frontend udc-marketplace-frontend
```

Visita `http://localhost:3000` en tu navegador.

---

## 📦 Ejecución con Docker Compose

Puedes levantar el servicio frontend con:
```bash
docker compose up --build -d
```

---

## 🔗 Endpoints del Backend Go Conectados

| Método | Endpoint | Descripción | Componente Frontend |
| :--- | :--- | :--- | :--- |
| `POST` | `/user/register` | Registro de estudiante con datos UDC | `src/pages/RegisterPage.tsx` |
| `POST` | `/user/login` | Login y obtención del JWT | `src/pages/LoginPage.tsx` |
| `POST` | `/post/create` | Creación de post con `multipart/form-data` | `src/pages/CreatePostPage.tsx` |
| `PUT` | `/post/:id/update` | Actualización de post existente | `src/components/marketplace/EditPostDialog.tsx` |
| `DELETE` | `/post/:id/delete` | Eliminación de post | `src/pages/MyPostsPage.tsx` |
| `POST` | `/valoration/send` | Envío de reseña/comentario | `src/components/marketplace/ValorationSection.tsx` |
| `GET` | `/uploads/:file` | Servidor de archivos estáticos | `src/lib/utils.ts` (`getBackendImageUrl`) |

---

## 📂 Estructura del Código

```
udc-marketplace-frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── marketplace/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   ├── ImageUploader.tsx
│   │   │   ├── ValorationSection.tsx
│   │   │   └── EditPostDialog.tsx
│   │   └── ui/                     # Componentes shadcn/ui
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── skeleton.tsx
│   │       ├── tabs.tsx
│   │       └── textarea.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── MarketplaceContext.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CreatePostPage.tsx
│   │   ├── MyPostsPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── postService.ts
│   │   └── mockData.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── Dockerfile
├── nginx.conf
├── docker-compose.yml
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```
