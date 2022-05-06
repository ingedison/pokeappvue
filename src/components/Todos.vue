<script setup lang="es">
import { dataStore } from '@/stores/data'
import {defineComponent} from 'vue'
import StarIcon from "./icons/IconStarOff.vue"
import Footer from "@/components/footer.vue";
import Modal from "@/components/modal.vue";
import { ref, onUnmounted, getCurrentInstance, watch, createApp } from 'vue'

export default defineComponent ({
  components: {Footer, Modal},
  data: function () {
      return {
          store: dataStore,
          modalShow: false,
          filteredArray: [],
          serachkey:''
      }
  },
  
  mounted(){
      
    //console.log("montado componente lista");
    console.log(this.store.data)
      this.serachkey='';
      this.filteredArray = [];
      Array.prototype.push.apply(this.filteredArray, this.store.data);
      this.$forceUpdate();
  },
    watch: {
    // whenever question changes, this function will run
    serachkey(a, b) {
        //console.log(this.serachkey);
        this.filteredArray = [];
         if(this.serachkey==''){
            Array.prototype.push.apply(this.filteredArray, this.store.data); 
         }
         else{
             Array.prototype.push.apply(this.filteredArray, filterSearch(this.store.data, this.serachkey));  
         }
         this.$forceUpdate();
    }
  },
  methods: {
      mark: function(ev, item, index){

          var obj = {
              'name': item.name,
              'url': item.url,
              'fav': !item.fav,
              '_index': item._index
          }
          console.log(obj);
          this.store.data.splice(item._index, 1, obj);

          if (this.serachkey!=''){
          let _newindex = this.filteredArray.indexOf(obj);
          this.filteredArray.splice(_newindex, 1, obj);
          }
          else{
           this.filteredArray.splice(item._index, 1, obj);
          }

          
          this.$forceUpdate();
      },
      search: function(ev, word){

       },
      openmodal: function(ev,item, index) {
          /*const appContext = getCurrentInstance();
          const container = ref();
          const el = container.value;

          let app = createApp(Modal, {_showmodal:false});
            Object.assign(app._context, appContext) // must use Object.assign on _context
            app.mount(el)*/
            //this.$refs.container.innerHTML = el.innerHTMLapp;

            const mountEl = document.createElement('div');
                document.body.appendChild(mountEl);

                const dialog = createApp({extends:Modal }, {
                    _showmodal: true,
                    _pokename: item
                });

                dialog.mount(mountEl);

      }
  }
});

function filterSearch(array, skey){
        var filteredArray = array.filter(function (el) {
                return el.name.includes(skey);
        });
        console.log(filteredArray);
        return filteredArray;
}

</script>

<template>
<div>
    <div class="list-container div-search">
    <svg style="vertical-align: middle;" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.7552 15.5622L14.2499 12.0574C14.0917 11.8992 13.8772 11.8113 13.6522 11.8113H13.0791C14.0495 10.5705 14.6261 9.00967 14.6261 7.31179C14.6261 3.27273 11.3528 0 7.31304 0C3.27329 0 0 3.27273 0 7.31179C0 11.3508 3.27329 14.6236 7.31304 14.6236C9.01121 14.6236 10.5723 14.0471 11.8134 13.0768V13.6498C11.8134 13.8748 11.9013 14.0892 12.0595 14.2474L15.5648 17.7522C15.8953 18.0826 16.4297 18.0826 16.7567 17.7522L17.7517 16.7573C18.0822 16.4269 18.0822 15.8926 17.7552 15.5622ZM7.31304 11.8113C4.82731 11.8113 2.81271 9.80061 2.81271 7.31179C2.81271 4.82648 4.82379 2.81223 7.31304 2.81223C9.79876 2.81223 11.8134 4.82297 11.8134 7.31179C11.8134 9.79709 9.80228 11.8113 7.31304 11.8113Z" fill="#BFBFBF"/>
    </svg>
    <input v-model="serachkey" type="text" class="search" placeholder="Search"/>
    </div>

     <ul class="list-container">
       <template v-for="(item,index) in filteredArray" :key="item.name">
           <li style="cursor:pointer" v-on:click.self="openmodal($event, item, index)"><span v-on:click.self="openmodal($event, item, index)">{{item.name}} </span> <div class="starcircle" v-on:click="mark($event, item, index)">
                   <svg :class="[item.fav == true ? 'stariconOn' : 'stariconOff', 'staricon']" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="star_path" d="M11.6052 0.904438L8.43178 7.62704L1.33161 8.70855C0.0583408 8.9015 -0.451939 10.5415 0.471424 11.4809L5.60824 16.7107L4.39329 24.0984C4.1746 25.4338 5.52076 26.4341 6.64824 25.8096L13 22.3213L19.3518 25.8096C20.4792 26.429 21.8254 25.4338 21.6067 24.0984L20.3918 16.7107L25.5286 11.4809C26.4519 10.5415 25.9417 8.9015 24.6684 8.70855L17.5682 7.62704L14.3948 0.904438C13.8262 -0.293851 12.1787 -0.309084 11.6052 0.904438Z" />
                    </svg>               
           </div></li>
       </template>
    </ul> 
    <Footer/>
    <div id="container"></div>
</div>
    <!--<Modal :showmodal=modalShow />-->
</template>
<style scoped>
.div-search{
    height:50px !important;
    margin-bottom: 10px;
    height: 60px;
    background: #FFFFFF;
    border-radius: 5px;
    padding-left:18px;
}
.search{
    height: 100% !important;
    margin-left: 10px;
    border:0px;
}
</style>
