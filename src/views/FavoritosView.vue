<script setup lang="es">
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
    <Favoritos/>
</template>