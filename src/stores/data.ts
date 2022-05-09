import { defineStore } from "pinia";
import {ref, computed, watch} from "vue"
import { useStorage } from "@vueuse/core"

export const dataStore = defineStore({
  id: "data",
  state: () => ({
    data: ref('', []).value,
    teststring: ref('mo+rena'),
    persist: useStorage('persist', "true"),
  }
  ),
  getters: {
    //doubleCount: (state) => state.counter * 2,
    //setdata: (array) => array.data
    getData: (state) => {state.data},
    getTestString: (state) => {state.teststring}
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
