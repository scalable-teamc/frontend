<template xmlns="http://www.w3.org/1999/html">
  <div class="container">
    <ul>
      <li class="icon">
        <div class="rounded"><img src="../assets/tweetie1.png" class="logo"/></div>
      </li>
      <li>
        <router-link to="/home">
          <b-icon icon="house"></b-icon>
        </router-link>
      </li>
      <li>
        <b-icon icon="bell"></b-icon>
      </li>
      <!--      <li>-->
      <!--        <b-icon icon="envelope"></b-icon>-->
      <!--      </li>-->
      <li>
        <b-icon icon="search" @click="$modal.show('follow')"></b-icon>
        <modal name="follow" class="modal">
          <div class="search">
            <input placeholder="username" v-model="find">
            <button @click="search">search</button>
          </div>
          <div class="user" v-if="found">
            <div>
              <img src="../assets/tweetie.png" width="100px" v-if="!image">
              <img :src="image" width="100px" v-else>
              <p>{{ name }} @ {{username}}</p>
            </div>
            <div class="buttons">
              <button class="unfollow" @click="unfollow">unfollow</button>
              <button class="follow" @click="follow">follow</button>
            </div>
          </div>
        </modal>
      </li>
      <li>
        <b-icon icon="archive"></b-icon>
      </li>
      <li>
        <router-link to="/profile">
          <b-icon icon="person"></b-icon>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      found: false,
      find: "",
      username: "",
      name: "",
      image: "",
      uid: null
    }
  },
  methods: {
    async search() {
      let response = await Vue.axios.post("http://localhost:8084/profile/getuser", {"username": this.find})
      let user = response.data
      if (user.display_name) {
        this.found = true
        this.name = user.display_name
        this.username = this.find
        this.image = user.picture
        this.uid = user.uid
      }
      console.log(user)
    },
    async unfollow() {
      await Vue.axios.patch("http://localhost:8084/profile/unfollow", {"uid": this.$store.state.uid, "remove_id": this.uid})
      await this.updateFollow()
    },
    async follow() {
      console.log(this.$store.state.uid)
      await Vue.axios.post("http://localhost:8084/profile/follow", {"uid": this.$store.state.uid, "following_id": this.uid})
      await this.updateFollow()
    },
    async updateFollow() {
      let follow = await Vue.axios.post("http://localhost:8084/profile/getfollow", {"uid": this.$store.state.uid})
      await this.$store.dispatch("setFollow", follow.data)
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #ffc400;
  width: 80px;
  height: 100vh;
  float: left;
  margin: 0;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.rounded {
  border-radius: 50%;
  width: fit-content;
  background-color: white;
  margin: auto;
  padding: 6px;
}

.logo {
  height: 50px;
}

li {
  height: 60px;
  padding: 5px;
  cursor: pointer;
}

ul {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}

.icon {
  height: 90px;
}

svg {
  width: 28px;
  height: 28px;
  margin-top: 10px;
}

button {
  margin: 0 10px 5px 5px;
  padding: 7px;
  border: none;
  cursor: pointer;
  border-radius: 2px;
}

.unfollow:hover {
  background-color: #f34444;
  color: white;
}

.follow:hover {
  background-color: #1db45e;
  color: white;
}

.user {
  position: relative;
  top: 20%;
}

.search {
  position: relative;
  top: 10%;
  height: fit-content;
}

.search svg {
  margin: auto;
}

.search button {
  height: 21px;
  margin: 0;
  padding: 0;
  border: solid grey 1px;
}
</style>