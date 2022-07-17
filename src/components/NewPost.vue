<template>
  <div class="sticky">
    <div class="rounded" @click="$modal.show('post')">
      <p class="icon">+</p>
    </div>

    <modal name="post">
      <div class="new">
        <div class="grid">
          <img src="../assets/tweetie.png" width="50px" v-if="!$store.state.image">
          <img :src="$store.state.image" width="50px" v-else>
          <p>{{ $store.state.name }}</p>
        </div>
        <textarea placeholder="New Post ..." v-model="text"></textarea>
        <input type="file" accept="image/png, image/jpeg" class="pic" @change="uploadPic">
      </div>
      <div class="buttons">
        <button @click="$modal.hide('post')" class="cancel">cancel</button>
        <button class="post" @click="post">post</button>
      </div>
    </modal>
  </div>
</template>

<script>
import Vue from "vue";
import {socket} from "@/socket/io.js"

export default {
  data() {
    return {
      text: null,
      image: null
    }
  },
  mounted() {
    // this.socket = io.connect('http://localhost:5000')
  },
  methods: {
    async post() {
      let img = ""
      let ctype = ""
      if (this.image) {
        img = this.image.split(',')[1]
        ctype = this.image.substring(
            this.image.indexOf(":") + 1,
            this.image.lastIndexOf(";")
        );
      }
      let data = {
        "userID": this.$store.state.uid,
        "username": this.$store.state.username,
        "content": this.text,
        "image": img,
        "type": ctype,
        "mediaID": 0
      }
      let response = await Vue.axios.post("http://localhost:5466/post", data)
      this.sendToFollower(response.data)
      this.$modal.hide('post')
      this.text = null
      this.image = null
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
    },
    sendToFollower(postID) {
      for (let index in this.$store.state.follower) {
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let data = {"to": this.$store.state.follower[index], "postID": postID, "date": date}
        console.log(data)
        socket.emit('broadcast_message', data)
      }
    }
  }
}
</script>


<style scoped>
.sticky {
  float: right;
  position: -webkit-sticky;
  position: sticky;
  cursor: pointer;
  height: 100vh;
  margin: 0;
  top: 0;
  padding: 0;
}

.rounded {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #ff8800;
  text-align: center;
  position: relative;
  top: 88%;
  right: 30%;
}

.icon {
  padding: 2px;
  margin: auto;
  font-size: 50px;
  color: white;
}

.new {
  padding: 20px 20px 5px 20px;
  text-align: left;
}

.grid {
  display: grid;
  width: 150px;
  grid-template-columns: 50px auto;
}

textarea {
  width: 500px;
  height: 130px;
  border: none;
  display: block;
  margin: 15px auto 5px auto;
  resize: none;
}

.buttons {
  text-align: right
}

button {
  margin: 0 10px 5px 5px;
  padding: 7px;
  border: none;
  cursor: pointer;
  border-radius: 2px;
}

.cancel:hover {
  background-color: #f34444;
  color: white;
}

.post:hover {
  background-color: #1db45e;
  color: white;
}

button {
  margin: 0 10px 5px 5px;
  padding: 7px;
  border: none;
  cursor: pointer;
  border-radius: 2px;
}
</style>