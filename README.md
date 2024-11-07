# Order Management System

Este es un sistema de gestión de órdenes desarrollado en Node.js con TypeScript para el backend y React con TypeScript para el frontend. El sistema permite crear, visualizar, actualizar y eliminar órdenes, con soporte para paginación y filtrado por estado. **Este proyecto no utiliza una base de datos**; los datos de las órdenes se almacenan en memoria mientras el servidor esté en ejecución.

## Características

- **Backend** en Node.js con TypeScript, con endpoints CRUD para manejar órdenes.
- **Frontend** en React con TypeScript, con interfaz de usuario para la gestión de órdenes.
- Soporte de **paginación** en la lista de órdenes, mostrando un límite de 5 elementos por página.
- **Filtrado** de órdenes por estado (`completed`, `pending`, `cancelled`).
- **Transiciones de eliminación** de órdenes en la interfaz para mejorar la experiencia de usuario.

## Requisitos Previos

Asegúrate de tener las siguientes herramientas instaladas en tu máquina:

- **Node.js** (versión 14 o superior)
- **Git**
- **NPM** o **Yarn**

## Instalación

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/dest175/crud_orderlist.git
   cd repository-name
   ```

2. Instala las dependencias del backend y el frontend.

  ```bash
  cd backend
  npm install
  npm run dev
  ```

  ```bash
  cd frontend
  npm install
  npm start
  ```


