<script>
import Favoritos from "@/components/Favoritos.vue";
import {defineComponent} from 'vue';

export default defineComponent ({
  components: {Favoritos},
  data: function () {
      return {
      }
  }
}
);
</script>

<template>
  <transition name="fade">
    <Favoritos/> 
   </transition>
    
</template>
<style scoped>
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