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
      <v-col>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <h2 class="my-2">Listado de Ventas</h2>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startDate"
                  label="Fecha Inicial"
                  prepend-icon="far fa-calendar-alt"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
                @input="
                  menu1 = false;
                  currentPage = 1;
                "
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  label="Fecha Final"
                  prepend-icon="far fa-calendar-alt"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endDate"
                @input="
                  menu2 = false;
                  currentPage = 1;
                "
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mb-5">
      <v-col cols="12" sm="6" md="4">
        <h3>Subtotal: {{ convertMoney(subtotal) }}</h3>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <h3>Total impuestos: {{ convertMoney(impuestos) }}</h3>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <h3>Total vendido: {{ convertMoney(total) }}</h3>
      </v-col>
    </v-row>

    <table class="table t mt-4">
      <thead>
        <tr>
          <th class="headOrderBy" scope="col" @click="sort('id')">#</th>
          <th scope="col">Fecha</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Sub Total</th>
          <th scope="col">Impuesto</th>
          <th scope="col">Total</th>
          <th scope="col">Acciones</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="data in filteredEntries">
          <tr v-bind:key="data.id">
            <td>{{ data.id }}</td>
            <td>{{ data.date }}</td>
            <th scope="col"></th>
            <td>{{ convertMoney(data.subtotal) }}</td>
            <td>{{ convertMoney(data.taxes) }}</td>
            <td>{{ convertMoney(data.total) }}</td>
            <td>
              <v-btn v-on:click="data.show = !data.show"> Detalles </v-btn>
            </td>
            <td></td>
          </tr>
          <tr
            v-bind:key="pedido.detalle_serial"
            v-show="data.show"
            v-for="pedido in data.Detalles"
          >
            <td></td>
            <td>{{ pedido.Producto.name }}</td>
            <td>{{ pedido.cantidad }}</td>
            <td>{{ convertMoney(pedido.monto) }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </template>
      </tbody>
    </table>

    <div class="text-center">
      <v-pagination
        v-model="currentPage"
        :length="getLength"
        class="mt-4"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import _ from "lodash";

export default {
  name: "Reportes",
  data() {
    return {
      currentSort: "id",
      currentSortDir: "asc",
      pageSize: 10,
      currentPage: 1,
      sizeList: 0,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      total: 0,
      subtotal: 0,
      impuestos: 0,
    };
  },
  created() {
    this.getAllVentas();
  },
  methods: {
    ...mapActions(["getAllVentas"]),
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    convertMoney(value) {
      const formatterPeso = new Intl.NumberFormat("es-CR", {
        style: "currency",
        currency: "CRC",
        minimumFractionDigits: 2,
      });
      let valueFinal = formatterPeso.format(value);

      return valueFinal;
    },
  },
  computed: {
    ...mapState(["ventas"]),
    getLength() {
      return Math.ceil(this.sizeList / this.pageSize);
    },
    filteredEntries() {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      const lista = this.ventas.filter((venta) => {
        const date = new Date(venta.date);
        return (
          (date >= startDate || !this.startDate) &&
          (date <= endDate || !this.endDate)
        );
      });

      const filteredList = lista
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });

      this.sizeList = lista.length;

      _.map(lista, (producto) => {
        this.total = this.total + producto.total;
        this.impuestos = this.impuestos + producto.taxes;
        this.subtotal = this.subtotal + producto.subtotal;
      });

      return filteredList;
    },
  },
};
</script>

<style>
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}
table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}
.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
th {
  text-align: inherit;
}
</style>
