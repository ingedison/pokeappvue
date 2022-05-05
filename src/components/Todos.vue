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
          modalShow: false
      }
  },
  
  mounted(){
      this.$forceUpdate();
    console.log("montado componente lista");
    console.log(this.store.data)
      
  },
  methods: {
      mark: function(ev, item, index){

          var obj = {
              'name': item.name,
              'url': item.url,
              'fav': !item.fav
          }
          console.log(obj);
          this.store.data.splice(index, 1, obj);
          console.log(this.store.data);
          this.$forceUpdate();
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
})

</script>

<template>

     <ul class="list-container">
       <template v-for="(item,index) in store.data" :key="item.name">
           <li style="pointer:hand" v-on:click="openmodal($event, item, index)"><span>{{item.name}} </span> <div class="starcircle" v-on:click="mark($event, item, index)">
                   <svg :class="[item.fav == true ? 'stariconOn' : 'stariconOff', 'staricon']" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="star_path" d="M11.6052 0.904438L8.43178 7.62704L1.33161 8.70855C0.0583408 8.9015 -0.451939 10.5415 0.471424 11.4809L5.60824 16.7107L4.39329 24.0984C4.1746 25.4338 5.52076 26.4341 6.64824 25.8096L13 22.3213L19.3518 25.8096C20.4792 26.429 21.8254 25.4338 21.6067 24.0984L20.3918 16.7107L25.5286 11.4809C26.4519 10.5415 25.9417 8.9015 24.6684 8.70855L17.5682 7.62704L14.3948 0.904438C13.8262 -0.293851 12.1787 -0.309084 11.6052 0.904438Z" />
                    </svg>               
           </div></li>
       </template>
    </ul> 
    <Footer/>
    <div id="container"></div>
    <!--<Modal :showmodal=modalShow />-->
</template>
