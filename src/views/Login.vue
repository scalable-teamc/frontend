<template>
  <div class="justify-content-center container">
    <div class="login">
      <div class="rounded m-5">
        <img src="../assets/tweetie1.png"/>
      </div>
      <h1>Tweetie</h1>
      <form>
        <div>
          <b-icon icon="person-fill" scale="1.3"></b-icon>
          <input type="text" name="username" placeholder="username">
        </div>
        <div>
          <b-icon icon="key-fill" scale="1"></b-icon>
          <input type="password" name="password" placeholder="password">
        </div>
        <div>
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>

    <div class="register">
      <form v-if="register" class="acc">
        <h3>Register</h3>
        <div>
          <b-icon icon="person-fill" scale="1.3"></b-icon>
          <input type="text" name="username" placeholder="username">
        </div>
        <div>
          <b-icon icon="key-fill" scale="1"></b-icon>
          <input type="password" name="password" placeholder="password">
        </div>
        <div>
          <b-icon icon="key-fill" scale="1"></b-icon>
          <input type="cpassword" name="cpassword" placeholder="re-type password">
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

.container {
  width: 700px;
  height: 400px;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
  display: grid;
  grid-template-columns: 50% 50%;
  border-radius: 1%;
  overflow: hidden;
}

.rounded {
  border-radius: 50%;
  width: fit-content;
  background-color: white;
  margin: 15px auto auto auto;
  padding: 7px;
}

img {
  height: 90px;
}

button {
  margin: 20px;
  border: none;
  padding: 5px;
  background-color: black;
  color: white;
  border-radius: 5px;
}

.login {
  background-color: #ffc400;

}

.register {
  background-color: white;
  padding: 10px;
}

.acc{
  position: relative;
  top: 30%;
}
.acc h3 {
  position: absolute;
  top: -45%;
  left: 10%;
}
</style>