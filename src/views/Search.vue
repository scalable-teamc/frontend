<template>
  <div>
    <Nav class="nav"/>
    <modal name="follow" class="modal">
      <div class="search">
        <input placeholder="username" v-model="find">
        <button @click="search">search</button>
      </div>
      <div class="user" v-if="found">
        <div>
          <img src="../assets/tweetie.png" width="100px" v-if="!image">
          <img :src="image" width="100px" v-else>
          <p>{{ name }} @ {{ username }}</p>
        </div>
        <div class="buttons">
          <button class="unfollow" @click="unfollow" :disabled="!following || uid === $store.state.uid ">unfollow</button>
          <button class="follow" @click="follow" :disabled="following || uid === $store.state.uid ">follow</button>
          <button class="profile" @click="toProfile(uid, username)">Profile</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import axios from "axios";

export default {
  mounted() {
    this.$modal.show('follow')
  },
  components: {Nav},
  data() {
    return {
      found: false,
      find: "",
      username: "",
      name: "",
      image: "",
      uid: null,
      following: false
    }
  },
  methods: {
    async search() {
      let response = await axios.post("/profile/getuser", {"username": this.find})
      let user = response.data
      if (user.display_name) {
        this.found = true
        this.name = user.display_name
        this.username = this.find
        this.image = user.picture
        this.uid = user.uid
      }
      this.following = this.$store.state.following.includes(this.uid)
    },
    async unfollow() {
      await axios.patch("/profile/unfollow", {
        "uid": this.$store.state.uid,
        "remove_id": this.uid
      })
      await this.updateFollow()
    },
    async follow() {
      console.log(this.$store.state.uid)
      await axios.post("/profile/follow", {
        "uid": this.$store.state.uid,
        "following_id": this.uid
      })
      await this.updateFollow()
    },
    async updateFollow() {
      let follow = await axios.post("/profile/getfollow", {"uid": this.$store.state.uid})
      await this.$store.dispatch("setFollow", follow.data)
      this.following = this.$store.state.following.includes(this.uid)
    },
    toProfile(uid, username) {
      this.$router.push({
        name: "UserProfile",
        path: "/user-profile/" + uid,
        params: {uid: uid, username: username}
      })
    },
  }
}
</script>

<style scoped>
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

.profile:hover {
  background-color: #ffa807;
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

button:disabled {
  cursor: default;
}
button:disabled:hover {
  background-color: ghostwhite;
}
</style>