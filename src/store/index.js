import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: "",
    productos: [],
    categorias: [],
    clientes: [],
    newClient: false,
    ventas: [],
  },
  mutations: {
    setProductos(state, payload) {
      state.productos = payload;
    },
    setCategorias(state, payload) {
      state.categorias = payload;
    },
    setNewClient(state, payload) {
      state.newClient = payload;
    },
    setClientes(state, payload) {
      state.clientes = payload;
    },
    setVentas(state, payload) {
      state.ventas = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    //Productos
    async createProducto({ commit }, producto) {
      try {
        const resp = await axios.post(`/producto/create`, producto);
        return resp;
      } catch (error) {
        commit("setError", error.message);
        return error;
      }
    },
    async getProductos({ commit }, id) {
      try {
        const productos = await axios.get(`/producto/list/${id}`);
        commit("setProductos", productos.data);
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async getAllProductos({ commit }) {
      try {
        const productos = await axios.get(`/producto/list`);
        commit("setProductos", productos.data);
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async editProducto({ commit }, producto) {
      try {
        const resp = await axios.put(`/producto/${producto.id}`, producto);
        console.log("Producto editada");
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async deleteProducto({ commit }, id) {
      try {
        await axios.delete(`/producto/${id}`);
      } catch (error) {
        commit("setError", error.message);
      }
    },

    //Categorias
    async createCategoria({ commit }, categoria) {
      try {
        const resp = await axios.post(`/categoria/create`, categoria);
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async getAllCategorias({ commit }) {
      try {
        const categoria = await axios.get(`/categoria/list`);
        commit("setCategorias", categoria.data);
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async editCategoria({ commit }, categoria) {
      try {
        const resp = await axios.put(`/categoria/${categoria.id}`, categoria);
        console.log("Categoria editada");
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async deleteCategoria({ commit }, id) {
      try {
        await axios.delete(`/categoria/${id}`);
      } catch (error) {
        commit("setError", error.message);
      }
    },

    //Clientes
    async createCliente({ commit }, cliente) {
      try {
        const resp = await axios.post(`/cliente/create`, cliente);
        commit("setNewClient", true);
        console.log(resp.data)
        return resp.data;
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async getAllClientes({ commit }) {
      try {
        const cliente = await axios.get(`/cliente/list`);
        commit("setClientes", cliente.data);
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async editCliente({ commit }, cliente) {
      try {
        const resp = await axios.put(`/cliente/${cliente.id}`, cliente);
        console.log("Cliente editada");
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async deleteCliente({ commit }, id) {
      try {
        await axios.delete(`/cliente/${id}`);
      } catch (error) {
        commit("setError", error.message);
      }
    },

    //Ventas
    async createVenta({ commit }, venta) {
      try {
        const resp = await axios.post(`/venta/create`, venta);
        console.log(resp.data.venta.id)
        return resp.data.venta.id;
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async getAllVentas({ commit }) {
      try {
        const cliente = await axios.get(`/venta/list`);
        commit("setVentas", cliente.data);
      } catch (error) {
        commit("setError", error.message);
      }
    },
  },
  modules: {},
});
