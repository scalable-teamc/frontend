<template>
  <div class="sticky">
    <div class="rounded" @click="$modal.show('post')">
      <p class="icon">+</p>
    </div>

    <modal name="post">
      <div class="new">
        <div class="grid">
          <img src="../assets/tweetie.png" width="50px">
          <p>{{ $store.state.name }}</p>
        </div>
        <textarea placeholder="New Post ..." v-model="text"></textarea>
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
      text: null
    }
  },
  methods: {
    async post() {
      let data = {"userID": 0, "mediaID": 0, "content": this.text}
      let response = await Vue.axios.post("http://localhost:5466/post", data)
      console.log(response)
    }
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
  padding: 20px 20px 15px 20px;
}

.grid {
  display: grid;
  width: 150px;
  grid-template-columns: 50px auto;
}

textarea {
  width: 500px;
  height: 170px;
  border: none;
  display: block;
  margin: auto;
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
</style>