# Revolutionz 🌿

Tienda online de suplementos nutricionales y productos de salud premium.

## ✨ Características

- **Diseño Moderno** - Interfaz visualmente atractiva con soporte para tema claro/oscuro
- **Navegación Intuitiva** - Sidebars interactivos para menú, carrito y cuenta de usuario
- **Catálogo de Productos** - Exhibición de suplementos con precios, descripciones y beneficios
- **Carrito de Compras** - Sistema de gestión del carrito de compras
- **Búsqueda Predictiva** - Búsqueda inteligente de productos
- **Experiencia Smooth** - Desplazamiento fluido con Lenis
- **Totalmente Responsivo** - Optimizado para dispositivos móviles y escritorio

## 🛠️ Tecnologías

- **React Router 7** - Framework web moderno
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Estilos con utility-first
- **Lucide React** - Iconos
- **Lenis** - Smooth scrolling

## 🚀 Getting Started

### Instalación

```bash
pnpm install
```

### Desarrollo

```bash
pnpm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Producción

```bash
pnpm run build
```

### Despliegue

El proyecto está configurado para desplegarse en Vercel:

```bash
vercel deploy
```

## 📁 Estructura

```
app/
├── assets/          # Imágenes y recursos estáticos
├── components/     # Componentes React
│   ├── layout/     # Header, Footer, PageLayout
│   ├── product/    # Catálogo y vista de productos
│   └── ui/         # Componentes UI (Aside, Carousel, etc.)
├── lib/            # Utilidades y contexto
├── routes/         # Rutas de la aplicación
└── styles/         # Estilos globales
```

## 🎨 Personalización

### Temas

El proyecto soporta tema claro y oscuro. El toggle está disponible en el header.

### Colores

Los colores están definidos en `app/styles/app.css` usando variables CSS:

- Primary: `#2ed1a3` (Verde esmeralda)
- Accent: `#f59e0b` (Ambar)
- Dark: `#0a0f1a` (Negro azulado)

## 📄 Licencia

MIT License

---

Construido con ❤️ para una experiencia de compra premium.