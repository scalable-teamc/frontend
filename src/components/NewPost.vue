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

export default {
  data() {
    return {
      text: null,
      image: null
    }
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
      let data = {"userID": this.$store.state.uid, "username": this.$store.state.username, "content": this.text, "image":img, "type": ctype, "mediaID": 0}
      let response = await Vue.axios.post("http://localhost:5466/post", data)
      console.log(response)
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
  }
}
</script>


<style scoped>
.sticky {
  float: right;
  position: -webkit-sticky;
  position: sticky;
  top: 85%;
  right: 2%;
  cursor: pointer;
}

.rounded {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #ff8800;
}

.icon {
  padding: 2px;
  margin: auto;
  font-size: 50px;
  color: white;
}

.new {
  padding: 20px 20px 10px 20px;
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
  margin: 15px auto auto auto;
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