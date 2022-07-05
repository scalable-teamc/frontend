<template>
  <div>
    <Nav class="nav"/>
    <NewPost/>

    <div class="body">
      <a href="#" @click="edit">Edit Profile &nbsp;<b-icon icon="pen" scale="0.9"></b-icon>
      </a>
      <img src="../assets/tweetie.png" width="200px">

      <div class="profile" v-if="!editMode">
        <h3>{{ $store.state.name }}</h3>
        <p>@{{ $store.state.username }}</p>
        <p>{{ $store.state.desc }}</p>
      </div>

      <div class="edit" v-else>
        <input type="file" accept="image/png, image/jpeg" class="pic" @change="uploadPic">
        <input type="text" v-model="name" style="text-align: center">
        <p>@{{ $store.state.username }}</p>
        <textarea placeholder="About me ..." v-model="desc"></textarea>
        <div></div>
        <button class="cancel" @click="cancel">cancel</button>
        &nbsp;
        <button class="save">save</button>
      </div>

      <p>{{ following }} Following &nbsp; {{ follower }} Followers</p>

      <img :src="image" width="200px">

      <Post v-for="i in 10" :key="i"></Post>
    </div>

    1
  </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import Post from "../components/Post.vue"
import NewPost from "../components/NewPost.vue"
import Vue from "vue";

export default {
  data() {
    return {
      name: this.$store.state.name,
      desc: this.$store.state.desc,
      following: 0,
      follower: 0,
      editMode: false,
      image: null
    }
  },
  components: {Nav, Post, NewPost},
  methods: {
    edit() {
      this.editMode = true
    },
    cancel() {
      this.editMode = false
    },
    async uploadPic(event) {
      const files = event.target.files
      if (files && files[0]) {
        const reader = new FileReader
        reader.onload = e => {
          this.image = e.target.result
        }
        await reader.readAsDataURL(files[0])
      }

      let img = this.image.split(',')[1]
      let ctype = this.image.substring(
          this.image.indexOf(":") + 1,
          this.image.lastIndexOf(";")
      );
      let data = {"uid": "admin", "image": img, "type": ctype}

      let response = await Vue.axios.post("http://localhost:8084/profile/save", data)
      console.log(response)
    }
  }
}
</script>

<style scoped>
.body {
  width: 80%;
  margin: 0 50px 0 150px;
}

img {
  /*display: block;*/
  margin-top: 30px;
}

textarea {
  resize: none;
  width: 300px;
  border: darkgray solid 1px;
}

a {
  position: absolute;
  right: 2%;
  top: 2%;
}

button {
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 2px;
}

.cancel:hover {
  background-color: #f34444;
  color: white;
}

.save:hover {
  background-color: #1db45e;
  color: white;
}

.pic {
  display: block;
  margin: auto auto 10px 41%;
}
</style>