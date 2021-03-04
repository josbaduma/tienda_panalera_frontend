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
          :items="productos"
          sort-by="id"
          class="elevation-1"
          :items-per-page="5"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>INVENTARIO</v-toolbar-title>
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
                            v-model="editedItem.barcode"
                            label="Código de Barras"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Nombre"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="editedItem.category"
                            :items="categorias"
                            item-text="name"
                            item-value="id"
                            label="Categoria"
                            persistent-hint
                            single-line
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.price"
                            label="Precio"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.quantity"
                            label="Cantidad"
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
                    >¿Seguro que desea eliminar el producto?</v-card-title
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
            <v-btn color="primary" @click="getAllProductos"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "Inventario",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Id", value: "id" },
      { text: "Código de Barras", value: "barcode" },
      { text: "Nombre", value: "name" },
      { text: "Categoria", value: "Categorium.name" },
      { text: "Precio", value: "price" },
      { text: "Cantidad", value: "quantity" },
      { text: "Actions", value: "actions" },
    ],
    editedIndex: -1,
    editedItem: {
      id: 0,
      barcode: 0,
      name: "",
      category: 0,
      price: 0,
      quantity: 0,
    },
    defaultItem: {
      id: 0,
      barcode: 0,
      name: "",
      category: 0,
      price: 0,
      quantity: 0,
    },
  }),

  computed: {
    ...mapState(["productos", "categorias", "error"]),
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
    this.getAllProductos();
    this.getAllCategorias();
  },

  methods: {
    ...mapActions([
      "getAllCategorias",
      "getAllProductos",
      "createProducto",
      "editProducto",
      "deleteProducto",
    ]),
    editItem(item) {
      this.editedIndex = this.productos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.productos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteProducto(this.editedIndex + 1);
      this.productos.splice(this.editedIndex, 1);
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

    async save() {
      try {
        if (this.editedIndex > -1) {
          Object.assign(this.productos[this.editedIndex], this.editedItem);
          this.editProducto(this.editedItem);
        } else {
          const res = await this.createProducto(this.editedItem);
          console.log(res.data);

          if (res.data.producto) {
            this.productos.push(this.editedItem);
            Swal.fire({
              icon: "success",
              title: "Producto Registrado",
              showConfirmButton: false,
              timer: 5000,
            });
          }
        }
        this.close();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Producto no registrado",
          showConfirmButton: false,
          timer: 5000,
        });
        this.close();
      }
    },
  },
};
</script>