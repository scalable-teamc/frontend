<template>
  <div>
    <Nav class="nav"/>
    <NewPost />

    <div class="body">
      <img src="../assets/tweetie.png" width="200px">

      <div class="profile">
        <h3>John Doe</h3>
        <p>@johndoe123</p>
        <p>{{ following }} Following &nbsp; {{ follower }} Followers</p>
      </div>

      <Post v-for="i in 10" :key="i"></Post>
    </div>

    1
  </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import Post from "../components/Post.vue"
import NewPost from "../components/NewPost.vue"

export default {
  data() {
    return {
      following: 0,
      follower: 0
    }
  },
  components: {Nav, Post, NewPost}
}
</script>

<style scoped>
.body {
  width: 80%;
  margin: 0px 50px 0px 150px;
}

img {
  margin-top: 30px;
}
</style>