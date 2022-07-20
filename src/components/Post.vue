<template>
  <div class="post">
    <div>
      <div class="profile">
        <img src="../assets/tweetie.png" width="50px" v-if="!profilePic">
        <img :src="profilePic" width="50px" v-else>
        <p>{{ name }}@{{ username }}</p>
      </div>
      <span class="time">{{ createdAt }}</span>
    </div>
    <div class="content">
      <p>{{ content }}</p>
      <img :src="image">
    </div>
    <div class="action">
      <b-icon icon="heart" v-if="!like" @click="likePost"></b-icon>
      <b-icon icon="heart-fill" style="color: #fc3838" v-else @click="likePost"></b-icon>
<!--      <b-icon icon="chat"></b-icon>-->
<!--      <b-icon icon="reply"></b-icon>-->
      <b-icon icon="bookmark" v-if="!save" @click="savePost"></b-icon>
      <b-icon icon="bookmark-fill" v-else @click="savePost"></b-icon>
    </div>
  </div>

</template>

<script>
import Vue from "vue";
import axios from "axios";

export default {
  props: ["postID", "username", "name", "createdAt", "content", "image", "isSaved", "isLiked", "profilePic"],
  mounted() {
    this.save = this.isSaved
  },
  data() {
    return {
      like: this.isLiked,
      save: false
    }
  },
  methods: {
    async savePost() {
      const profileAPI = "/profile"
      this.save = !this.save
      let data = {"uid": this.$store.state.uid, "post_id": this.postID}
      if (this.save) {
        // await Vue.axios.post("http://localhost:8084/profile/savedPost", data)
        await Vue.axios.post(profileAPI + "/savedPost", data)
      } else {
        // await Vue.axios.patch("http://localhost:8084/profile/unsavedPost", data)
        await Vue.axios.patch(profileAPI + "/unsavedPost", data)
      }
    },
    async likePost() {
      const likeURI = "/like"
      const unlikeURI = "/unlike"
      this.like = !this.like
      let data = {"userID": this.$store.state.uid, "postID": this.postID}
      console.log(data)
      if (this.like) {
        // await axios.post("http://localhost:5466/like", data)
        await axios.post(likeURI, data)
      } else {
        // await axios.post("http://localhost:5466/unlike", data)
        await axios.post(unlikeURI, data)
      }
    }
  }
}
</script>

<style scoped>
.post {
  background-color: #f6f6f6;
  padding: 20px;
  border-radius: 4px;
  text-align: left;
  margin: 10px;
}

.profile {
  margin: 5px;
  display: grid;
  grid-template-columns: 60px 50%;
}

.time {
  position: relative;
  top: -40px;
  left: 80%;
}

.content {
  margin: 20px;
}

.action svg {
  margin-left: 40px;
  margin-right: 40px;
  cursor: pointer;
}
</style>

