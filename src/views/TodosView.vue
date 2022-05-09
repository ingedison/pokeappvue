<script setup lang="es">
import Loading from "@/components/Loading.vue";
import Todos from "@/components/Todos.vue";
import { ref } from 'vue';
import {defineComponent,watch} from 'vue'
import { dataStore } from '@/stores/data'
import {fetchapi} from '../logic/data'
export default defineComponent ({
  components: {Loading, Todos},
  data: function () {
      return {
          /*showLoading: true,
          showlist:false,
          api_data: {},*/
          
      }
  },

  setup() {
     /*const showLoading= true
     return {showLoading}*/
     //const gstore = ref(dataStore())
     const {store,showLoading,showlist} = fetchapi();
     const api_dat=[];
    /* watch(store, (currentValue, oldValue) => {
       
       if (currentValue != undefined) {
         console.log("wololo");
            gstore.data = Array.from(currentValue);
            console.log(currentValue);
       }

          });
*/
     return{store,showLoading,showlist,api_dat}
  },
  methods: {

  },
  watch:{
      store(a, b) {
        console.log("");

      }
  }
  /*mounted(){
    var self = this;
    console.log(self.store.data);
    
    if (self.store.data !== undefined){
            self.showLoading= false;
            self.showlist=true;
    }
    else{
      self.store.data = [];
      //cargar datos de la api
        fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => response.json())
        .then(data => loadfunc(data.results,self));
        //self.api_data = api_dat;
        //self.store.fill(self.api_dat);

  
      setTimeout(() => {
        self.showLoading = false;
        self.showlist = true;
        console.log("se ejecutó 2"+self.showLoading );
      }, 5000);
    } 
  }*/
});

/*function loadfunc(data, instance){
var _data = [];
Array.prototype.push.apply(_data, data);
  for (var i=0; i<_data.length; i++){
        console.log(_data[i].name);
           instance.store.data.push({'name':data[i].name, 'url': data[i].url, 'fav':false, '_index':i})
      }

    console.log(instance.store.data);

}*/

</script>

<template>
  <main>
    <Loading v-if="showLoading" />
  </main>
  <transition name="fade">
    <Todos v-if="showlist" />
      
   </transition>

</template>


<style>
  .fade-enter-from {
    opacity: 0;
  }
  .fade-enter-to {
    opacity: 1;
  }
  .fade-enter-active {
    transition: all 1s ease;
  }
  .fade-leave-from {
    opacity: 1;
  }
  .fade-leave-to {
    opacity: 0;
  }
  .fade-leave-active {
    transition: all 1s ease;
  }
</style>