
### Pasos
```bash
# 1. Entrar al directorio
cd /home/javiercuesta/dev/udc-marketplace-frontend

# 2. Instalar dependencias (si no se han instalado)
npm install

# 3. Iniciar el servidor de desarrollo Vite
npm run dev
```


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

## Ejecución con Docker Compose

Puedes levantar el servicio frontend con:
```bash
docker compose up --build -d
```

---

## Endpoints del Backend Go Conectados

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

## Estructura del Código

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
