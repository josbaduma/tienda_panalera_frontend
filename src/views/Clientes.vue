<template>
  <v-container>
    <v-row no-gutters>
      <div class="text-center">
        <v-btn class="mx-2" fab dark color="primary" @click="$router.go(-1)">
          <v-icon dark> fas fa-arrow-left </v-icon>
        </v-btn>
      </div>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="clientes"
          sort-by="id"
          class="elevation-1"
          :items-per-page=5
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>CLIENTES</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    NUEVO PRODUCTO
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.cedula"
                            label="Cédula"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Nombre"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.phone"
                            label="Teléfono"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.email"
                            label="Email"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >¿Seguro que desea eliminar el cliente?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancelar</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              fas fa-edit
            </v-icon>
            <v-icon small @click="deleteItem(item)"> fas fa-trash </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="getAllClientes"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Clientes",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    desserts: [],
    headers: [
      { text: "ID", value: "id" },
      { text: "Cédula", value: "cedula" },
      { text: "Nombre", value: "name" },
      { text: "Teléfono", value: "phone" },
      { text: "Email", value: "email" },
      { text: "Actions", value: "actions" },
    ],
    editedIndex: -1,
    editedItem: {
      id: 0,
      cedula: "",
      name: "",
      phone: "",
      email: "",
    },
    defaultItem: {
      id: 1,
      cedula: "0-0000-0000",
      name: "General",
      phone: "0000-0000",
      email: "email",
    },
  }),

  computed: {
    ...mapState(["clientes", "error"]),
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Item" : "Editar Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getAllClientes();
  },

  methods: {
    ...mapActions(["getAllClientes", "createCliente", "editCliente", "deleteCliente"]),
    editItem(item) {
      this.editedIndex = this.clientes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.clientes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

     deleteItemConfirm() {
      this.deleteCliente(this.editedIndex + 1);
      this.clientes.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });

    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.clientes[this.editedIndex], this.editedItem);
        this.editCliente(this.editedItem);
      } else {
        this.createCliente(this.editedItem);
        this.clientes.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>