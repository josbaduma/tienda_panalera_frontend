<template>
  <v-container>
    <v-row>
      <v-col cols="1">
        <div class="text-center">
          <v-btn class="mx-2" fab dark color="primary" @click="$router.go(-1)">
            <v-icon dark> fas fa-arrow-left </v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="5"><h1>Ventas</h1> </v-col>
      <v-col>
        <v-btn @click="opened = true">Añadir Producto</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-dialog v-model="opened" max-width="900px">
          <v-card>
            <v-card-title>
              <span>Productos</span>
            </v-card-title>
            <v-card-subtitle>
              <v-text-field label="Filtro" v-model="filter"></v-text-field>
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col
                  cols="4"
                  v-bind:key="i"
                  v-for="(prod, i) in filteredProducts"
                >
                  <v-card outlined elevation="3">
                    <v-card-title> {{ prod.name }} </v-card-title>
                    <v-card-text>
                      <b>Disponibles:</b>
                      {{ prod.quantity }}
                      <br />
                      <b>Precio:</b>
                      {{ convertMoney(prod.price) }}
                      <br />
                      <b>Cantidad en lista:</b>
                      {{ itemOnList(prod) }}
                      <br />
                      <v-btn
                        color="blue-grey"
                        class="mr-1"
                        x-small
                        :dark="prod.quantity > 0"
                        :disabled="prod.quantity <= 0"
                        v-on:click="addCart(prod, true)"
                        ><v-icon x-small>fas fa-plus</v-icon></v-btn
                      >
                      <v-btn
                        color="blue-grey"
                        x-small
                        :dark="prod.quantity > 0"
                        :disabled="prod.quantity <= 0"
                        v-on:click="addCart(prod, false)"
                        ><v-icon x-small>fas fa-minus</v-icon></v-btn
                      >
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text @click="opened = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-list>
          <v-list-item-group class="blue-grey darken-2 white--text" dark>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-text="'ID'"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title v-text="'Nombre'"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title v-text="'Precio'"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title v-text="'Cantidad'"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title v-text="'Impuestos'"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title v-text="'Total'"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon> </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
          <v-list-item-group class="blue-grey lighten-5">
            <v-list-item v-for="(item, index) in carrito" :key="index">
              <v-list-item-content class="py-1">
                <v-list-item-title v-text="index + 1"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="py-1">
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="py-1">
                <v-list-item-subtitle>
                  <span> {{ item.price }}</span>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="py-1">
                <v-list-item-subtitle>
                  <v-icon small v-on:click="cambiarCantidad(index, false)">
                    far fa-minus-square
                  </v-icon>
                  <span class="px-2">{{ item.quantity }}</span>
                  <v-icon small v-on:click="cambiarCantidad(index, true)">
                    far fa-plus-square
                  </v-icon>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="py-1">
                <v-list-item-subtitle>
                  <span v-if="check_taxes">
                    {{ item.quantity * item.price * 0.13 }}</span
                  >
                  <span v-else> {{ item.quantity * item.price * 0 }}</span>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="py-1">
                <v-list-item-subtitle>
                  <span v-if="check_taxes">
                    {{ item.quantity * item.price * 1.13 }}</span
                  >
                  <span v-else> {{ item.quantity * item.price }}</span>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon v-on:click="deleteItem(index)"> fas fa-trash </v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item
              v-if="carrito.length === 0"
              class="blue darken-4 white--text text-center"
              dark
            >
              <v-list-item-title
                v-text="'El Carro de Compras está Vacío.'"
              ></v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="4">
        <v-card elevation="5" class="mx-auto blue-grey lighten-4">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-2">CLIENTE</div>
              <Cliente class="mb-2" :cliente="cliente" />
              <div class="mb-4">
                <vue-autosuggest
                  v-if="cliente.name == ''"
                  :suggestions="filteredOptions"
                  :input-props="{
                    id: 'cliente-autocomplete',
                    placeholder: 'Nombre del cliente',
                  }"
                  :get-suggestion-value="getSuggestionValue"
                  @selected="onSelected"
                >
                  <div slot-scope="{ suggestion }">
                    <span style="cursor: auto">
                      {{ suggestion.item.name }}
                    </span>
                  </div>
                </vue-autosuggest>
                <div v-else>
                  <p>Cédula: {{ cliente.cedula }}</p>
                  <p>Nombre: {{ cliente.name }}</p>
                  <p>Teléfono: {{ cliente.phone }}</p>
                  <p>Correo: {{ cliente.email }}</p>
                  <div class="text-center pb-3">
                    <v-btn
                      depressed
                      color="error"
                      @click="cliente = { name: '' }"
                    >
                      Remover
                    </v-btn>
                  </div>
                  <hr />
                </div>
              </div>
              <v-list-item-subtitle class="subtitle-1 mb-1">
                Subtotal: {{ convertMoney(onViewSubTotal()) }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="title mb-1"
                >Total: {{ convertMoney(onViewTotal()) }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn color="green" @click="sendSale">Facturar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import _ from "lodash";
import router from "../router";
import Swal from "sweetalert2";
import Cliente from "../components/Cliente";
import axios from "axios";
//import pdfkit from "pdfkit";

export default {
  name: "Ventas",
  components: {
    Cliente,
  },
  data() {
    return {
      dialog: false,
      carrito: [],
      check_taxes: false,
      opened: false,
      monto_pago: 0,
      selected: "",
      filter: "",
      cliente: {
        id: 0,
        cedula: "",
        name: "",
        email: "",
        phone: "",
      },
      finalLine: 0,
    };
  },
  created() {
    this.getAllClientes();
    this.getAllProductos();
  },
  computed: {
    ...mapState(["productos", "clientes", "newClient"]),
    filteredProducts() {
      return this.productos.filter((option) => {
        return (
          option.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
        );
      });
    },
    filteredOptions() {
      return [
        {
          data: this.clientes.filter((option) => {
            return (
              option.name
                .toLowerCase()
                .indexOf(this.cliente.name.toLowerCase()) > -1
            );
          }),
        },
      ];
    },
  },
  methods: {
    ...mapActions(["getAllClientes", "getAllProductos", "createVenta"]),
    async sendSale() {
      const venta = {
        subtotal: this.onViewSubTotal(),
        impuestos: this.onViewImp(),
        total: this.onViewTotal(),
        tipo: "Efectivo",
        detalles: [],
      };

      _.each(this.carrito, (item) => {
        const detalle = {
          producto: item.id,
          cantidad: item.quantity,
          monto: item.price * item.quantity,
        };

        venta.detalles.push(detalle);
      });

      try {
        const invoice = this.createVenta(venta);
        const objeto = this.createObjectInvoice(invoice);

        const file = await axios.post("/invoice/print", objeto, {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/pdf",
          },
        });

        const url = window.URL.createObjectURL(
          new Blob([file.data], {
            type: "application/pdf",
          })
        );

        window.open(url);
      } catch (error) {
        console.log(error);
      }

      Swal.fire({
        icon: "success",
        title: "Venta Registrada",
        showConfirmButton: false,
        timer: 5000,
      });
      router.push({ path: "/" });
    },
    onSelected(item) {
      this.selected = item.item;
      this.cliente = {
        name: this.selected.name,
        id: this.selected.id,
        cedula: this.selected.cedula,
        email: this.selected.email,
        phone: this.selected.phone,
      };
    },
    getSuggestionValue(suggestion) {
      return suggestion.item.name;
    },
    itemOnList(item) {
      const data = _.find(this.carrito, (prod) => {
        return prod.name === item.name;
      });
      if (data) {
        return data.quantity;
      } else {
        return 0;
      }
    },
    addCart(item, type) {
      const data = _.find(this.carrito, (prod) => {
        return prod.name === item.name;
      });

      if (!data && type) {
        const itemcar = {
          id: item.id,
          name: item.name,
          quantity: 1,
          price: item.price,
        };

        this.carrito.push(itemcar);
      } else if (data && !type && data.quantity > 1) {
        data.quantity--;
      } else if (data && type && data.quantity === 1) {
        data.quantity++;
      } else if (data && !type && data.quantity >= 1) {
        const index = this.carrito.indexOf(data);
        this.carrito.splice(index, 1);
      } else {
        data.quantity++;
      }
    },
    deleteItem(i) {
      this.carrito.splice(i, 1);
    },
    convertMoney(value) {
      const formatterPeso = new Intl.NumberFormat("es-CR", {
        style: "currency",
        currency: "CRC",
        minimumFractionDigits: 0,
      });
      let valueFinal = formatterPeso.format(value);

      return valueFinal;
    },
    onViewSubTotal() {
      let total = 0;
      _.map(this.carrito, (data) => {
        total = total + data.quantity * data.price;
      });

      return total;
    },
    onViewImp() {
      let total = 0;
      let taxes = 0;

      _.map(this.carrito, (data) => {
        total = total + data.quantity * data.price;
      });

      if (this.check_taxes) {
        taxes = 0.13;
      }

      return total * taxes;
    },
    onViewTotal() {
      let total = 0;
      let taxes = 1;

      _.map(this.carrito, (data) => {
        total = total + data.quantity * data.price;
      });

      if (this.check_taxes) {
        taxes = 1.13;
      }

      return total * taxes;
    },
    onViewVuelto() {
      let total = 0;
      var percentage = 1;
      _.map(this.carrito, (data) => {
        total = total + data.quantity * data.price;
      });

      if (this.checkImpuestos) {
        percentage = 1.1;
      }
      return this.monto_pago - total * percentage;
    },
    cambiarCantidad(i, type) {
      const dataCar = this.carrito;
      let quantityd = dataCar[i].quantity;

      if (type) {
        quantityd = quantityd + 1;
      } else if (type == false && quantityd >= 1) {
        quantityd = quantityd - 1;
      }

      if ((type == false && quantityd >= 1) || type) {
        dataCar[i].quantity = quantityd;
        this.carrito;
      }
    },
    createObjectInvoice(num_invoice) {
      const invoice = {
        shipping: {
          id: this.cliente.cedula,
          name: this.cliente.name,
          address: this.cliente.email,
        },
        items: [],
        subtotal: this.onViewSubTotal(),
        taxes: this.onViewImp(),
        total: this.onViewTotal(),
        invoice_nr: num_invoice,
      };

      _.each(this.carrito, (detalle) => {
        const item = {
          description: detalle.name,
          quantity: detalle.quantity,
          amount: detalle.price,
        };

        invoice.items.push(item);
      });

      return invoice;
    },
  },
};
</script>
<style>
#autosuggest input {
  background-color: white;
  width: 100%;
  border: rgba(30, 39, 46, 1) 2px solid;
  border-radius: 8px;
  padding: 0.25rem;
}

#autosuggest ul {
  width: 100%;
  color: rgba(30, 39, 46, 1);
  list-style: none;
  margin: 0;
  padding: 0.5rem 0 0.5rem 0;
}
#autosuggest li {
  margin: 0 0 0 0;
  border-radius: 5px;
  padding: 0.75rem 0 0.75rem 0.75rem;
  display: flex;
  align-items: center;
}
#autosuggest li:hover {
  cursor: pointer;
}

#autosuggest {
  justify-content: center;
  width: 280px;
}

#autosuggest {
  width: 100%;
  display: block;
}
.autosuggest__results {
  position: absolute;
  background-color: white;
  min-width: 350px;
  z-index: 1000;
}
.autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178, 0.2);
}
.autosuggest__results ul {
  background-color: #fff !important;
  border: 1px solid #000;
  border-radius: 5px;
  width: 260px;
}
.autosuggest__results ul li {
  position: relative;
  padding: 0px;
}
</style>
