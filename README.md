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
    │   ├── data.js          # define las operaciones del array obtenido desde la pokeApi via http
    │   ├── search.js         # define las operaciones para filtar los resultados de busquea
    │   └── modal.js  #define las operaciones para cargar la data en la ventana modal de manera recursiva 
	├── router
	│   ├── index.ts # clase para mapeo de las rutas uls de la aplición vs vistas
	├── stores # definición de almacenes pinia
	│   ├── data.ts # definición de almacenes de datos que se utilizan de manera compartida y reactiva entre los diferentes componentes
	├── views #definición de vistas, que son invocadas a traves del vueRouter
	│   ├── FavoritosView # vista de pokemones marcados como favoritos (localhost:8080/favoritos) 
	│   ├── TodosView # vsita de todos los pokemones (localhost:8080/favoritos) 
	│   ├── HomeView # vista de inicio de la aplicación, corresponde a la ruta (localhost:8080) 	
	├── main.ts	 # clase de definición de a instancia de vue y pinia
	├── index.html	 # definición la plantilla básica html donde se importa el script main.ts para iniciar la instancia de vue y sus componentes	
	├── package.json	#definición de paquetes npm, compilación para desarrollo, pruebas y producción
    └── ...

```
