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
###Construcción de la aplicación
##### Estructura del proyecto
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
	
##### Inicialización de aplicación de vue
```js
import { createApp } from "vue"; 
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from "./App.vue";
import router from "./router";
const app = createApp(App); /* creación de instancia global de vue */ 
const pinia = createPinia(); /* creación de instancia de pinia */
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(router);
app.mount("#app");
```
##### Componentes reutilizables
Se definen componentes para cada una de las partes que conforman la aplicación, por ejemplo, la caja de busqueda, lista de favoritos, ventana modal y la animación de carga.

Los componentes hacen uso de los métodos definidos en la clase logic, de tal forma que la logica contenida en los archivos .js del directorio logic de reutilizan a medida que se implementan nuevas funcionalidades o cambios permitiendo también la fácil depuración y pruebas de los mismos.

A continuación se detalla el código base del componente de favoritos, el cúal referencia a su vez a componentes como footer (menú de pie de página), search (caja de busqueda) y modal (ventana de detalles del pokemon):

```js
import {defineComponent} from 'vue'
import { ref, watch, reactive } from 'vue'
import Footer from "@/components/footer.vue"
import Search from "@/components/search.vue";
import {modalwindow} from "../logic/modal"
import Modal from "@/components/modal.vue";
import {favs} from "../logic/data" //clase que contiene la definición de la lógica base de este componente, la cual es reutilizada en diferentes componentes.

export default defineComponent ({
  components: {Footer,Search,Modal}, // adición de componentes adicionales
  data: function () {
      return {
      }
  },
    setup() {
        const serachkey= ref({value:""}); //se define para obtener el valor ingresado en la caja de busqueda
        const {filtered_dat,has_favs,getfavs,unmark,store} = favs(); //obtiene las definiciones previamente definidas  en el archivo clase logic/data.js
        const {openmodal} = modalwindow(); 
     return{filtered_dat,has_favs,getfavs,unmark,store,serachkey,openmodal} //haciendo uso de los conceptos de herencia y polimorfismo se implementan las variables y métodos que serán ejecutados por este componente 
  },
  mounted(){
      this.getfavs(); //la función getfavs(); "obtener favoritos", se hereda desde logic/data.js y se ejecuta una vez se monta el componente
  },
  methods: {
  //definición de funciones espeficas para esta clase
      unmark: function(ev, item, index){

      }
  }
```
##### Lógica reutilizable 

Se toma como ejemplo el archivo /logic/data.js, contiene los metodos para el procesamiento del array obtenido de la pokeApi vía http request. 

```js
import {toRefs, ref, reactive, onMounted} from 'vue';
import { dataStore } from '@/stores/data'
export function all(){ //definición de la función clase all

export function fetchapi(){
    const baseurl = "https://pokeapi.co/api/v2/"; //podría mejorarse implementando un store conteniendo este string
 
    let store = dataStore(); // hacemos uso del pinia store definido previamente
/*variables reactivas: se implementa un objeto rectivo state JavaScript que ejecutarán un acción en el componente que hereda está función cuando la variable cambie su valor*/

    let state = reactive({
        showLoading: true,
        showlist: false
      });

//función se dispara una vez el componente es llamada e implementado

    onMounted(() => {
        const endpoint = baseurl+'pokemon'
        var self = this;
        if ((store.data).length > 0) { //si el store ya ha sido cargado no se mostrará la pantalla de cargando sino que se mostrará directamente la lista de pokemones
            state.showLoading= false;
            state.showlist=true;
        }
        else{  
        //en caso de no tener datos en el store, se procederá a cargarlo realizando el llamado a la pokeApi
        store.data = [];
        fetchData(endpoint);
    } 
    });
// de tal forma que se define la función fecthData que cargará de manera asincrona la data y cargará el store con la data requerida

    const fetchData = async (endpoint) => {
        store.data = [];
            fetch(endpoint)
            .then(response => response.json())
            .then(data => loadfunc(data.results)); /*se invoca la función para cargar el array una vez hay respuesta de la api, se puede mejorar controlando las excepciones http 404, 501 etc*/
        setTimeout(() => {
            state.showLoading = false;
            state.showlist = true;
            console.log(store.data); //de manera condicional se borra la pantalla de cargando y se muestra la pantalla de lista
        }, 5000); // se estable un tiempo de 5segundos para mostrar la animación y retornar la data, este tiempo se ajusta a la respuesta de la PokeApi
    }
	/*función encargada de construir el Array necesario con base en la data obtenida en la respuesta GET HTTP*/
    const loadfunc = (data) => {
        var _data = [];
        Array.prototype.push.apply(_data, data);
          for (var i=0; i<_data.length; i++){
                console.log(_data[i].name);
                store.data.push({'name':data[i].name, 'url': data[i].url, 'fav':false, '_index':i})
              }
        }
/*Final mente retornamos el objeto reactivo hacia el comppmente que implementa esta función*/
    return {
        store,...toRefs(state)
    }
```
#####Almacenes de datos

Se realiza mediante el uso y la definición de PiniaStores, basados en la librería de pinia vue, a continuación se detalla el proceso de implementación utilizando un fragmento de código en typescript

```js
import { defineStore } from "pinia";
import {ref, computed, watch} from "vue"
import { useStorage } from "@vueuse/core" //opcional el uso de almacenamiento de stores en el localstorage

export const dataStore = defineStore({
  id: "data", 
  state: () => ({
    data: ref('', []).value, //se crea un array llamado data
    persist: useStorage('persist', "true"), //persite en el navegador gracias a localstorage
  }
  ),
  getters: {
    //implementación de funciones para recuperar la data contenida en el store
    getData: (state) => {state.data},
    getTestString: (state) => {state.teststring}
  },
  actions: {
      fill(array){ //definición de metodos asociados al store
           Array.prototype.push.apply(this.data, array)
      }
  },
  /*definición de localstorage*/
  persist:{    key: 'data',
  storage: window.sessionStorage,
  paths: ['nested.data'],
  beforeRestore: context => {
    console.log('Before hydration...')
  },
  afterRestore: context => {
    console.log('After hydration...')
  }
},
});

```
