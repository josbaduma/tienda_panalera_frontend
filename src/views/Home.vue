<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="4" class="pa-2">
        <v-card class="pa-2" elevation="2" outlined tile>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="'Ventas'"> </v-card-title>
              <v-card-actions>
                <v-btn class="ml-2 mt-5" outlined rounded small :to="{name: 'Ventas'}">
                  Ingresar
                </v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="75" tile>
              <v-img src="@/assets/images/sales.png"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4" class="pa-2">
        <v-card class="pa-2" elevation="2" outlined tile>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="'Inventario'">
              </v-card-title>
              <v-card-actions>
                <v-btn class="ml-2 mt-5" outlined rounded small :to="{name: 'Inventario'}">
                  Ingresar
                </v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="75" tile>
              <v-img src="@/assets/images/items.png"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4" class="pa-2">
        <v-card class="pa-2" elevation="2" outlined tile>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="'Categorias'">
              </v-card-title>
              <v-card-actions>
                <v-btn class="ml-2 mt-5" outlined rounded small :to="{name: 'Categorias'}">
                  Ingresar
                </v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="75" tile>
              <v-img src="@/assets/images/expenses_categories.png"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4" class="pa-2">
        <v-card class="pa-2" elevation="2" outlined tile>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="'Clientes'">
              </v-card-title>
              <v-card-actions>
                <v-btn class="ml-2 mt-5" outlined rounded small :to="{name: 'Clientes'}">
                  Ingresar
                </v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="75" tile>
              <v-img src="@/assets/images/customers.png"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4" class="pa-2">
        <v-card class="pa-2" elevation="2" outlined tile>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="'Reportes'">
              </v-card-title>
              <v-card-actions>
                <v-btn class="ml-2 mt-5" outlined rounded small :to="{name: 'Reportes'}">
                  Ingresar
                </v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="75" tile>
              <v-img src="@/assets/images/reports.png"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4" class="pa-2">
        <v-card class="pa-2" elevation="2" outlined tile>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="'Proveedores'">
              </v-card-title>
              <v-card-actions>
                <v-btn class="ml-2 mt-5" outlined rounded small :to="{}">
                  Ingresar
                </v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="75" tile>
              <v-img src="@/assets/images/suppliers.png"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
};
</script>
