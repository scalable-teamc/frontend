<template>
  <div class="register">
    <form v-if="register" class="acc" @submit.prevent="signUp()">
      <h3>Register</h3>
      <div>
        <b-icon icon="person-fill"></b-icon>
        <input type="text" name="username" placeholder="username" v-model="username">
      </div>
      <div>
        <b-icon icon="pencil"></b-icon>
        <input type="text" name="name" placeholder="display name" v-model="name">
      </div>
      <div>
        <b-icon icon="envelope"></b-icon>
        <input type="text" name="email" placeholder="email" v-model="email">
      </div>
      <div>
        <b-icon icon="key-fill"></b-icon>
        <input type="password" name="password" placeholder="password" v-model="password">
      </div>
      <div>
        <b-icon icon="key-fill"></b-icon>
        <input type="password" name="cpassword" placeholder="re-enter password" v-model="cpassword">
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>

    <div class="acc" v-else>
      <h2>Don't Have an Account?</h2>
      <h4><a href="#" @click="goToSignUp">Sign up Now</a></h4>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      register: false,
      username: "",
      name: "",
      email: "",
      password: "",
      cpassword: ""
    }
  },
  methods: {
    async signUp() {
      if (this.password !== this.cpassword) {
        alert("Passwords have to match")
      } else {
        let cred = {"username": this.username, "password": this.password}
        let response = await Vue.axios.post("http://localhost:8082/auth/register", cred)
        if (response.data.success) {
          this.username = ""
          this.password = ""
          this.cpassword = ""
        }
        alert(response.data.message)
      }
    },
    goToSignUp() {
      this.register = true
    }
  }
}
</script>

<style scoped>
input {
  font-size: 15px;
  margin: 5px;
}

button {
  margin: 20px;
  border: none;
  padding: 5px;
  background-color: black;
  color: white;
  border-radius: 5px;
}

.register {
  background-color: white;
  padding: 10px;
  border: darkgray solid 1px;
  border-radius: 0 5px 5px 0;
}

.acc {
  position: relative;
  top: 30%;
}

.acc h3 {
  position: absolute;
  top: -45%;
  left: 10%;
}
</style>