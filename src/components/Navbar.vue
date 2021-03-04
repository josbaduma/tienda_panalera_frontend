<template>
  <div>
    <div class="barra-superior">
      <p class="punto-venta">
        Sistema de Punto de Venta
      </p>
    </div>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h1>Tienda Pañalera</h1>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  data: () => ({}),
};
</script>
<style>
.barra-superior {
  width: 100%;
  max-width: 100%;
  max-height: 12vh;
  background-color: #182735;
}
.punto-venta {
  margin-top: 8vh;
  text-align: center;
  font-size: 20px;
  color: white;
}
</style>
