<script>
import { dataStore } from '@/stores/data'
import {defineComponent} from 'vue'
import StarIcon from "./icons/IconStarOff.vue"
import { ref, watch, reactive } from 'vue'
import Footer from "@/components/footer.vue"
import {favs} from "../logic/data"
import Search from "@/components/search.vue";
import {modalwindow} from "../logic/modal"
import Modal from "@/components/modal.vue";

export default defineComponent ({
  components: {Footer,Search,Modal},
  
  data: function () {
      return {
          //store: ref(dataStore),
          //filtered_dat:[],
          //has_favs:false,
      }
  },
    setup() {
        //const store = reactive(dataStore)
        const serachkey= ref({value:""});
        const {filtered_dat,has_favs,getfavs,unmark,store} = favs();
        const {openmodal} = modalwindow();
     /*const showLoading= true
     return {showLoading}*/
     /*const filtered_dat=[]*/
     return{filtered_dat,has_favs,getfavs,unmark,store,serachkey,openmodal}
  },
  mounted(){
      this.getfavs();
  },
  methods: {
      unmark: function(ev, item, index){

          var obj = {
              'name': item.name,
              'url': item.url,
              'fav': !item.fav,
              '_index': item._index
          }
          console.log(obj);
          this.store.data.splice(item.index, 1, obj);
          this.filtered_dat.splice(index, 1)
          
          console.log(this.filtered_dat.length);
          if (this.filtered_dat.length == 0) 
              this.has_favs=false;
          else
              this.has_favs=true;

          console.log(this.store.data);
         // this.$forceUpdate();
      }
  }
});

</script>

<template>
<div>
    <div v-if="has_favs">
    <Search v-model="serachkey"/>
     <ul  class="list-container">
       <template v-for="(item,index) in filtered_dat" :key="item.name">
           <li style="cursor:pointer" v-on:click.self="openmodal($event, item, index)"><span>{{item.name}} </span> <div class="starcircle" v-on:click="unmark($event, item, index)">
                   <svg :class="[item.fav == true ? 'stariconOn' : 'stariconOff', 'staricon']" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="star_path" d="M11.6052 0.904438L8.43178 7.62704L1.33161 8.70855C0.0583408 8.9015 -0.451939 10.5415 0.471424 11.4809L5.60824 16.7107L4.39329 24.0984C4.1746 25.4338 5.52076 26.4341 6.64824 25.8096L13 22.3213L19.3518 25.8096C20.4792 26.429 21.8254 25.4338 21.6067 24.0984L20.3918 16.7107L25.5286 11.4809C26.4519 10.5415 25.9417 8.9015 24.6684 8.70855L17.5682 7.62704L14.3948 0.904438C13.8262 -0.293851 12.1787 -0.309084 11.6052 0.904438Z" />
                    </svg>               
           </div></li>
       </template>
    </ul> 
    </div>

    <div v-else style="text-align:center; width:100%">
            <span class="t1"> ¡Uh-oh!</span>
            <span class="t2"> ¡aún no has agregado favoritos!</span>
    </div>
    
<Footer/>
</div>


</template>