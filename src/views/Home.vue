<template>
  <div class="container">
    <Nav class="nav"/>
    <NewPost class="new"/>
    Feed
    <div class="body">
      <!--      <Post v-for="i in 10" :key="i"></Post>-->
      <Post v-for="post in posts" :key="post.postID" :username="post.username" :created-at="post.createdAt"
            :content="post.content" :image="post.image">{{ post }}
      </Post>
    </div>
    1/1
  </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import Post from "../components/Post.vue"
import NewPost from "../components/NewPost.vue"
import io from "socket.io-client";
import Vue from "vue";

export default {
  components: {Nav, Post, NewPost},
  created() {
    this.socket = io.connect('http://localhost:5000')
    this.socket.on('my_response', (data) => {
      console.log(data)
    })
    this.socket.on(this.$store.state.uid, (data) => {
      console.log(data.postID)
      this.getPost(data.postID)
    })
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    async getPost(postID) {
      let post = await Vue.axios.get("http://localhost:5466/get/" + postID)
      this.posts.push(post.data)
      console.log(this.posts)
    }
  }
}
</script>

<style scoped>
.body {
  width: 80%;
  margin: 0px 50px 0px 150px;
}

.new {
  position: absolute;
  top: 85%;
  right: 2%;
}
</style>