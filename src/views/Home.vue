<template>
  <div class="container">
    <CrudUsuarios />
    <!-- <router-link to="/about">InformacoesUsuario</router-link> -->

  </div>
</template>

<script>
import CrudUsuarios from "@/components/CrudUsuarios.vue";

export default {
  name: "Home",
  components: {
    CrudUsuarios,
  },
};
</script>

<style></style>


