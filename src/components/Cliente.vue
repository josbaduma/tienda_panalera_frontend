<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Nuevo Cliente
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Cliente Nuevo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="data.cedula"
                  label="Cédula"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="data.name" label="Nombre"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="data.phone"
                  label="Teléfono"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="data.email" label="Email"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cerrar
          </v-btn>
          <v-btn color="blue darken-1" text @click="save">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Cliente",
  data: () => ({
    dialog: false,
    data: {
      id: 0,
      cedula: "",
      name: "",
      email: "",
      phone: "",
    },
  }),
  props: {
    cliente: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  methods: {
    ...mapActions(["createCliente"]),
    async save() {
      if (this.data.name !== "") {
        const datos_cliente = await this.createCliente(this.data);
        this.cliente.id = datos_cliente.cliente.id;
        this.cliente.name = datos_cliente.cliente.name;
        this.cliente.cedula = datos_cliente.cliente.cedula;
        this.cliente.phone = datos_cliente.cliente.phone;
        this.cliente.email = datos_cliente.cliente.email;
      }
      this.dialog = false;
    },
  },
};
</script>
