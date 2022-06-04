<template>
  <div class="container">
    <div class="view-header">
      <h1 class="title">#{{ usuario.id }}</h1>
      <router-link to="/">
        <button class="btn-secondary">
          <span>Voltar</span>
        </button>
      </router-link>
    </div>
    <div class="content">
      <div class="usario-avatar">
        <img :src="usuario.avatar" :alt="usuario.first_name">
      </div>
      <div class="usario-first-name">
        <p class="label">Primeiro nome</p>
        <p class="data">{{ usuario.first_name }}</p>
      </div>
      <div class="usario-last-name">
        <p class="label">Último nome</p>
        <p class="data">{{ usuario.last_name }}</p>
      </div>
    </div>
    <div class="more-content">
      <div class="information">
        <p class="label">Endereço de e-mail</p>
        <p class="data">{{ usuario.email }}</p>
      </div>
      <div class="information">
        <p class="label">Link do avatar</p>
        <p class="data">{{ usuario.avatar }}</p>
      </div>
      <div class="information">
        <p class="label">Link de suporte</p>
        <p class="data">{{ support.url }}</p>
      </div>
      <div class="information">
        <p class="label">Descrição do usuário</p>
        <p class="data">{{ support.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "./../../axios";
export default {
  name: "CrudUsuarios",
  data () {
    return {
      support: {
        text: "",
        url: ""
      },
      usuario: {
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
      }
    }
  },
  created() {
    this.usuario = this.$store.getters.getUsuarios.find(u => u.id === parseInt(this.$route.params.id));
    if(this.usuario.avatar.split('/')[this.usuario.avatar.split('/').length - 1] !== 'avatar.png') {
      axios.get(`/users/${this.$route.params.id}`)
      .then((response) => {
        this.usuario = response.data.data;
        this.support = response.data.support;
      }, (error) => {
        console.error(error)
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>
.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 61px;

  letter-spacing: 0.2px;
}

.btn-secondary {
  width: 185px;
  height: 55px;

  cursor: pointer;

  background: #F7F7F7;
  border-color: transparent;
  border-radius: 5px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.2px;
}

.btn-secondary:hover {
  background: #e5e5e5;
}

img {
  width: 120px;
  height: 120px;

  border-radius: 5px;
}

.content {
  display: flex;
  align-items: center;
}

.usario-first-name {
  margin-left: 34px;
}

.usario-last-name {
  margin-left: 46px;
}

.label {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  letter-spacing: 0.2px;

  color: #797979;
}

.data {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;

  letter-spacing: 0.2px;
}
</style>
