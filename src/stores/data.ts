import { defineStore } from "pinia";
import {ref, computed, watch} from "vue"
import { useStorage } from "@vueuse/core"

export const dataStore = defineStore({
  id: "data",
  state: () => ({
    data: useStorage('data', []).value,
    persist: useStorage('persisr', "true"),
  }
  ),
  getters: {
    //doubleCount: (state) => state.counter * 2,
    //setdata: (array) => array.data
    getData: (state) => {state.data}
  },
  actions: {
      fill(array){
           Array.prototype.push.apply(this.data, array)
      }
    /*increment() {
      this.counter++;
    },*/
  },
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
