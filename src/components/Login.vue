<template>
  <div class="login">
    <div class="rounded m-5">
      <img src="@/assets/tweetie1.png"/>
    </div>
    <h1>Tweetie</h1>
    <form @submit.prevent="login()">
      <div>
        <b-icon icon="person-fill" scale="1.3"></b-icon>
        <input type="text" name="username" placeholder="username" v-model="username">
      </div>
      <div>
        <b-icon icon="key-fill" scale="1"></b-icon>
        <input type="password" name="password" placeholder="password" v-model="password">
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store";
import {socket} from "@/socket/io";
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    async login() {
      const authURI = "/auth/login"
      const profileURI = "/profile"
      let cred = {"username": this.username, "password": this.password}
      // let response = await axios.post("http://localhost:8082/auth/login", cred)
      let response = await axios.post(authURI, cred)
      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token)
        axios.defaults.headers.common['Authorization'] = response.data.token
        // let profile = await axios.post("http://localhost:8084/profile/getprof", {"uid": response.data.uid, "username": this.username});
        let profile = await axios.post(profileURI + "/getprof", {"uid": response.data.uid, "username": this.username});
        await store.dispatch("setLoggedInUser", {
          "loggedIn": true,
          "uid": response.data.uid,
          "username": this.username,
          "name": profile.data.display_name,
          "image": profile.data.picture,
          "desc": profile.data.description,
          "following": profile.data.following,
          "follower": profile.data.follower
        });
        console.log(profile)
        socket.on('my_response', (data) => {
          console.log(data)
        })
        socket.emit('online', this.$store.state.uid)
        this.$router.push("/home")
      } else {
        alert(response.data.message)
      }
    },
  }
}
</script>

<style scoped>
.rounded {
  border-radius: 50%;
  width: fit-content;
  background-color: white;
  margin: 60px auto auto auto;
  padding: 7px;
}

img {
  height: 90px;
}

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
  cursor: pointer;
}

.login {
  background-color: #ffc400;

}
</style>
