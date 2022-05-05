import { defineStore } from "pinia";

export const dataStore = defineStore({
  id: "data",
  state: () => ({
    data: [],
  }),
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
});
