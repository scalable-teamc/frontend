<template>
  <div class="container">
    <Nav class="nav"/>
    Feed
    <div class="body">
      <Post class="post" v-for="i in 10" :key="i"></Post>
    </div>
    1/1
  </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import Post from "../components/Post.vue"

export default {
  components: {Nav, Post}
}
</script>

<style scoped>
/*.container {*/
/*  display: grid;*/
/*  grid-template-columns: auto auto;*/
/*}*/
.body {
  width: 80%;
  margin: 0px 50px 0px 150px;
}
.post {
  margin: 10px;
}
.nav {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: fit-content;
}
</style>