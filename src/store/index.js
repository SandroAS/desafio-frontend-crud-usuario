import Vue from "vue";
import Vuex from "vuex";

import axios from "./../../axios"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuarios: [],
    usuario: {},
    support: {}
  },
  mutations: {
    setUsuarios(state, value) {
      state.usuarios = value;
    },
    setUsuario(state, value) {
      state.usuario = value;
    },
    setSupport(state, value) {
      state.support = value;
    }
  },
  actions: {
    getUsuariosReqres({commit}) {
      axios.get(`/users`)
      .then((response) => {
        commit('setUsuarios', response.data.data);
      })
      .catch((error) => console.error(error))
    },
    getUsuarioReqres({commit}, id) {
      axios.get(`/users/${id}`)
      .then((response) => {
        commit('setUsuario', response.data.data);
        commit('setSupport', response.data.support);
      })
      .catch((error) => console.error(error))
    },
    setUsuarioLocal({commit}, usuario) {
      commit('setUsuario', usuario);
    }
  },
  getters: {
    getUsuarios(state) {
      return state.usuarios;
    },
    getUsuario(state) {
      return state.usuario;
    },
    getSupport(state) {
      return state.support;
    }
  },
  modules: {},
});
