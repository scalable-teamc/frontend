<template>
  <div class="container">
    <Nav class="nav"/>
    <NewPost />
    Feed
    <div class="body">
      <Post v-for="i in 10" :key="i"></Post>
    </div>
    1/1
  </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import Post from "../components/Post.vue"
import NewPost from "../components/NewPost.vue"

export default {
  components: {Nav, Post, NewPost}
}
</script>

<style scoped>
.body {
  width: 80%;
  margin: 0px 50px 0px 150px;
}
</style>