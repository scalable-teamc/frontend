<template>
  <div class="register">
    <form v-if="register" class="acc">
      <h3>Register</h3>
      <div>
        <b-icon icon="person-fill"></b-icon>
        <input type="text" name="username" placeholder="username">
      </div>
      <div>
        <b-icon icon="pencil"></b-icon>
        <input type="text" name="name" placeholder="display name">
      </div>
      <div>
        <b-icon icon="envelope"></b-icon>
        <input type="text" name="email" placeholder="email">
      </div>
      <div>
        <b-icon icon="key-fill"></b-icon>
        <input type="password" name="password" placeholder="password">
      </div>
      <div>
        <b-icon icon="key-fill"></b-icon>
        <input type="cpassword" name="cpassword" placeholder="re-enter password">
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>

    <div class="acc" v-else>
      <h2>Don't Have an Account?</h2>
      <h4><a href="#" @click="signUp">Sign up Now</a></h4>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      register: false
    }
  },
  methods: {
    signUp() {
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