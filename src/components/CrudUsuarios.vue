<template>
  <div>
    <div class="crud-header">
      <h1 class="title"><b>Usuários</b></h1>
      <button v-show="!createUsuario" class="btn-new-user" @click="close()">
        <span class="btn-new-user-text">Novo usuário</span>
      </button>
      <button v-show="createUsuario" class="btn-cancel" @click="close()">
        <span>Cancelar</span>
      </button>
    </div>
    <transition name="slide">
      <div v-if="createUsuario" class="form-usuario">
        <div class="form-name">
          <div class="form-label"><label>Nome do usuário</label></div>
          <input type="text" v-model="usuario.first_name">
        </div>
        <div class="form-function">
          <div class="form-label">
            <label>Função do usuário</label>
          </div>
          <div class="select-box">
            <div :class="'options-container ' + active">
              <div v-for="cargo in cargos" :key="cargo" 
                class="option" 
                @click="selectJob(cargo)"
              >
                <input type="radio" class="radio" :id="cargo" name="cargos"/>
                <label class="label-cargos" :for="cargo">{{ cargo }}</label>
              </div>
            </div>

            <div :class="selectedClass()" @click="active === '' ? active = 'active' : active = ''">
              {{ usuario.email }}
            </div>
          </div>
        </div>
        <div>
          <button class="btn-save" @click="save()">Salvar dados do usuário</button>
        </div>
      </div>
    </transition>
    
    <div class="list-usuarios">
      <ul>
        <li v-for="usuario in usuarios" :key="usuario.id">
          <div class="style-list"></div>
          <div class="card-usuario">
            <div class="card-content">
              <div class="card-user-data">
                <div>
                  <img class="card-avatar" :src="usuario.avatar" :alt="usuario.first_name">
                </div>
                <div class="card-text">
                  <p class="usuario-id">#{{ usuario.id }}</p>
                  <p class="usuario-name">{{ usuario.first_name + ' ' + usuario.last_name }}</p>
                  <p class="usuario-email">{{ usuario.email }}</p>
                </div>
              </div>
              <div class="card-icons">
                <div @click="edit(usuario)"><img src="@/assets/icons/edit.png" alt="edit"></div>
                <div @click="remove(usuario)"><img src="@/assets/icons/delete.png" alt="remove"></div>
                <img @click="view(usuario)" src="@/assets/icons/view.png" alt="view">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- The Modal -->
    <div v-if="dialog" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <div class="d-flex-justify-between-align-center">
          <h1 class="modal-title">Editar Usuário</h1>
          <span class="close" @click="dialog = !dialog">&times;</span>
        </div>
        <hr>
        <div class="form-usuario">
          <div class="form-name">
            <div class="form-label"><label>Nome do usuário</label></div>
            <input type="text" v-model="usuario.first_name">
          </div>
          <div class="form-function">
            <div class="form-label function-lable">
              <label>Função do usuário</label>
            </div>
            <div class="select-box">
              <div :class="'options-container ' + active">
                <div v-for="cargo in cargos" :key="cargo" 
                  class="option" 
                  @click="selectJob(cargo)"
                >
                  <input type="radio" class="radio" :id="cargo" name="cargos"/>
                  <label class="label-cargos" :for="cargo">{{ cargo }}</label>
                </div>
              </div>
              <div :class="selectedClass()" @click="active === '' ? active = 'active' : active = ''">
                {{ usuario.email }}
              </div>
            </div>
          </div>
          <div>
            <button class="btn-save" @click="save()">Salvar dados do usuário</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

 <script>
// const selected = document.querySelector(".selected");
// const optionsContainer = document.querySelector(".options-container");

// const optionsList = document.querySelectorAll(".option");


// optionsList.forEach(o => {
//   o.addEventListener("click", () => {
//     selected.innerHTML = o.querySelector("label").innerHTML;
//     optionsContainer.classList.remove("active");
//   });
// });
</script>
<style>
  .select-box {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .select-box .options-container {
    background: #fff;
    max-height: 0;
    width: 100%;
    opacity: 0;
    transition: all 0.4s;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.05);

    order: 1;
  }

  .disabled  {
    color: #797979 !important;
  }

  .selected {
    display: flex;
    align-items: center;
    position: relative;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.2px;

    background: transparent;
    color: #000;

    box-sizing: border-box;
    width: 100%;
    height: 55px;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
  }

  .selected::after {
    display: flex;
    align-items: center;
    content: url("icon/arrow-down.png");

    position: absolute;
    height: 100%;
    width: 17px;
    right: 21px;
    top: 0px;

    transition: all 0.4s;
  }

  .select-box .options-container.active {
    max-height: 140px;
    opacity: 1;
    overflow-y: scroll;
  }

  .select-box .options-container.active + .selected::after {
    transform: rotateX(180deg);
    top: 0px;
  }

  .select-box .options-container::-webkit-scrollbar {
    width: 8px;
    background: #797979;
    border-radius: 0 5px 5px 0;
  }

  .select-box .options-container::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 0 5px 5px 0;
  }

  .label-cargos {
    font-family: 'Montserrat' !important;
    font-style: normal !important;
    font-weight: 400 !important;
    font-size: 15px !important;
    line-height: 18px !important;
    letter-spacing: 0.2px !important;
  }

  .select-box .option,
  .selected {
    padding: 12px 24px;
    cursor: pointer;
  }

  .option {
    padding: 11.18px 24px !important;
  }

  .select-box .option:hover {
    background: #F7F7F7;
  }

  .select-box label {
    cursor: pointer;
  }

  .select-box .option .radio {
    display: none;
  }
</style>

<script>
export default {
  name: "CrudUsuarios",
  data () {
    return {
      createUsuario: false,
      dialog: false,
      active: "",
      editIndex: -1,
      cargos: [
        'Desenvolvedor',
        'Gerente de Projetos',
        'Tech Lead',
        'UI/UX Designer'
      ],
      usuario: {
        id: 0,
        email: 'Selecione a função',
        first_name: "",
        last_name: "",
        avatar: "",
      }
    }
  },
  created(){
    this.$store.dispatch("getUsuariosReqres");
  },
  computed: {
    usuarios: {
      get() {
        return this.$store.getters.getUsuarios;
      },
      set(value) {
        return value;
      }
    }
  },
  methods: {
    confgName(){
      let first_name = "";
      let last_name = "";
      let name = this.usuario.first_name.split(' ')

      if(name.length === 1) {
        first_name = name[0];
      } else if (name.length > 1) {
        first_name = name[0];
        for (let index = 1; index < name.length; index++) {
          last_name += name[index] + ' ';
          last_name.substring(0, last_name.length - 1);
        }
      }

      this.usuario.first_name = first_name;
      this.usuario.last_name = last_name;
    },
    selectedClass() {
      let classe = "";
      classe = this.usuario.email === 'Selecione a função' ? 'selected ' + 'disabled' : 'selected'
      return classe
    },
    selectJob(cargo) {
      this.usuario.email = cargo;
      this.active = "";
    },
    async save() {
      this.confgName();
      if(this.editIndex === -1) {
        this.usuario.id = this.usuarios[this.usuarios.length - 1].id + 1;
        this.usuario.avatar = 'http://localhost:8080/assets/img/avatar.png';
        await this.$store.dispatch("createUsuario", this.usuario);
        // this.usuarios.push(Object.assign({}, this.usuario)); // utilizado antes de implementar o axios
        this.createUsuario = false;
      } else {
        await this.$store.dispatch("editUsuario", this.usuario);
        // this.usuarios.splice(this.editIndex, 1, Object.assign({}, this.usuario)); // utilizado antes de implementar o axios
        this.dialog = false;
      }
      this.usuario = Object.assign({}, {
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
      })
    },
    edit(usuario) {
      this.usuario = Object.assign({},usuario);
      this.usuario.first_name = this.usuario.first_name + ' ' + this.usuario.last_name;
      this.editIndex = this.usuarios.indexOf(this.usuarios.find(u => u.id === this.usuario.id));
      this.dialog = true;
    },
    async remove(usuario) {
      await this.$store.dispatch("deleteUsuario", usuario);
      // const index = this.usuarios.indexOf(usuario) // utilizado antes de implementar o axios
      // this.usuarios.splice(index, 1); // utilizado antes de implementar o axios
    },
    close() {
      this.usuario = Object.assign({}, {
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
      })
      this.createUsuario = !this.createUsuario
    },
    async view(usuario){
      await this.$store.dispatch("setUsuarioLocal", usuario);
      this.$router.push(`/usuarios/${usuario.id}`)
    }
  }
};
</script>

<style scoped>
.crud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.title {
  width: 229px;
  height: 61px;

  margin: 0 6rem 0 0;
  
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 61px;
 
  letter-spacing: 0.2px;
  
  color: #000000;
}

@media only screen and (max-width: 660px) {
  .crud-header {
    display: block;
  }

  .title {
    margin-bottom: 12px;
  }
}

.btn-new-user {
  width: 185px;
  height: 55px;

  cursor: pointer;

  background: #000000;
  border-radius: 5px;
}

.btn-new-user-text {
  width: 104px;
  height: 18px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.2px;

  color: #FFFFFF;
}

.list-usuarios {
  max-width: 588px;
}

ul {
  padding: 0;
  margin-top: 43px;
}

li {
  list-style: none;
  display: flex;
}

.style-list {
  height: 20px;
  width: 4px;
  background-color: black;
  margin-top: 20px;
}

.card-usuario {
  width: 100%;
  height: 80px;
  max-width: 592px;
  margin-bottom: 15px;

  background: #F7F7F7;
  border-radius: 5px;
}

.card-usuario {
  padding: 20px 27px 20px 30px;
}

.card-content {
  display: flex;
  justify-content: space-between;
}

.card-user-data {
  display: flex;
}

.card-avatar {
  width: 80px;
  height: 80px;
  margin-right: 25px;

  border-radius: 5px;
}

.card-text p {
  font-family: 'Montserrat';
  font-style: normal;
  letter-spacing: 0.2px;
  line-height: 28px;
  margin: 0;
}

.usuario-id {
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  color: #797979;
}

.usuario-name {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;

  color: #000;
}

.usuario-email {
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  color: #797979;
}

.card-icons {
  display: flex;
  align-self: center;
}

.card-icons img {
  height: 17px;
  padding: 5px;
  border-radius: 7px;
}

.card-icons img:hover {
  background-color: rgba(0,0,0, 0.1);
  cursor: pointer;
}

@media only screen and (max-width: 560px) {
  .card-usuario {
    height: 160px;
  }
  
  .card-user-data {
    display: block;
  }

  .card-icons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card-icons img {
    margin: 10px 0;
  }
}

.btn-cancel {
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

.btn-cancel:hover {
  background: #e5e5e5;
}

.form-usuario {
  margin-top: 43px;
}

.form-label {
    margin-bottom: 12px;
}

.form-usuario label {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.2px;

  color: #000000;
}

.form-usuario input, select{
  box-sizing: border-box;

  width: 100%;
  height: 55px;

  border: 1px solid #E5E5E5;
  border-radius: 5px;
}

.form-name {
  margin-bottom: 24px;
}

.form-name input {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.2px;

  flex: 1;
  padding: 0 20px;

  color: #000000;
}

/* arrancar */
 select {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;

    flex: 1;
    padding: 0 20px;
    cursor: pointer;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.2px;

    background: transparent;
    color: #797979;
 }

/* arrancar */
 select::-ms-expand {
   display: none;
 }

 .form-function {
    overflow: hidden;
    border-radius: 5px;
    margin-bottom: 24px;
 }

/* arrancar */
 .arrow {
   margin: 0 20px 0 0;
   padding: 0;
   display: block;
   width: 20px;
   float: right;
 }

/* arrancar */
 .arrow-icon {
   margin-bottom: -37px;
 }

.btn-save {
  width: 100%;
  height: 55px;

  background: #000000;
  border-radius: 5px;
  cursor: pointer;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.2px;

  color: #FFFFFF;
}

.btn-save:hover {
  background: rgba(0, 0, 0, 0.9);
}

.slide-enter, .slide-leave-to {
  opacity: 0;
}

.slide-enter-active {
  animation: slide 0.7s;
  transition: opacity 0.7s;
}

.slide-leave-active {
  animation: slide 0.7s reverse;
  transition: opacity 0.7s;
}

@keyframes slide {
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(0px);
  }
}

hr {
  border-top: 0.5px #E5E5E5;
}

.d-flex-justify-between-align-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal {
  position: fixed;
  padding-top: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-title {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  width: 80%;
  border-radius: 5px;
  box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

</style>
