# Proyecto de prueba pokemon vue app

A continuación se detalla el procedimiento para desacargar el instalar el proyecto con sus dependencias:

##### Instalación de dependencias

```sh
npm install
```

#####Compilar para desarrollo

```sh
npm run dev
```

#####Compilar para producción

```sh
npm run build
```

##### Ejecutar pruebas unitarias con [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
---
### Estructura del proyecto

    .
    ├── src
	│   ├── components #incluye la definición de los componentes que se utilzan de manera dinámica durante su ejecución
	│   │   ├──Favoritos.vue
	│   │   ├──search.vue
	│   │   ├──footer.vue
	│   │   ├──loading.vue
		 │   ├── icons #carpeta de iconos para menus en formato svg
    ├── logic # incluye los archivos .js con la definición de la lógica del comportamiento de cada uno de los componentes así como funciones que se reutilizarán a lo largo del ciclo de vida de la aplicación
    │   ├── data.js          # Load and stress tests
    │   ├── search.js         # End-to-end, integration tests (alternatively `e2e`)
    │   └── modal.js                # Unit tests
    └── ...

```
