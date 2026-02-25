# FondosManager - Sistema de Gestión de Fondos

## 🚀 Características Principales

- **Dashboard de Fondos**: Visualización completa de los fondos de inversión disponibles en el mercado.
- **Sistema de Vinculación**: Lógica inteligente de suscripción que valida el saldo disponible del cliente contra el monto mínimo requerido por el fondo.
- **Gestión de Suscripciones**: Sección dedicada para monitorear y desvincularse de fondos activos.
- **Interfaz Responsiva**: Diseño adaptativo con un sidebar colapsable para una experiencia óptima en cualquier dispositivo.
- **Notificaciones Dinámicas**: Sistema de feedback visual para confirmar acciones exitosas o informar sobre errores de saldo.

## 🛠️ Stack Tecnológico

- **Frontend**: [Angular](https://angular.dev/) (Versión 18+)
- **Estilos**: [TailwindCSS 4](https://tailwindcss.com/) para un diseño moderno y utilitario.
- **Estado**: Uso de **Angular Signals** para una gestión de estado reactiva y eficiente.
- **Iconos**: Integración con Lucide o FontAwesome para una interfaz visual enriquecida.

## 🏗️ Estructura del Proyecto

El proyecto sigue una arquitectura modular y organizada:

- `src/app/pages`: Contiene las vistas principales como `dashboard` y `fund`.
- `src/app/layout`: Componentes estructurales como `header`, `sidebar` y el layout principal.
- `src/app/shared`: Componentes, servicios, modelos y constantes reutilizables en toda la aplicación.
- `src/app/services`: Lógica de negocio centralizada (e.g., `FundService`, `DashboardService`).

## ⚙️ Configuración y Desarrollo

### Prerrequisitos

- Node.js (versión 18 o superior)
- Angular CLI

### Instalación

1. Clona el repositorio:
   ```bash
   git clone [url-del-repositorio]
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

### Servidor de Desarrollo

Para iniciar el servidor local, ejecuta:

```bash
ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en los archivos.

### Construcción (Build)

Para compilar el proyecto para producción:

```bash
ng build
```

Los archivos resultantes se guardarán en el directorio `dist/`.

## 🧪 Pruebas

Para ejecutar las pruebas unitarias:

```bash
ng test
```

---

_Desarrollado como parte de una evaluación técnica para BTA Bank._
