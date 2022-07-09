<template>
  <div class="container">
    <Nav class="nav"/>
    <NewPost class="new"/>
    Feed
    <div class="body">
      <Post v-for="post in posts" :key="post.postID" :username="post.username" :name="post.name"
            :created-at="post.createdAt" :content="post.content" :image="post.image">{{ post }}
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
    // this.socket.emit('online', this.$store.state.uid)
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
      let content = await Vue.axios.get("http://localhost:5466/get/" + postID)
      let op = content.data.userID
      let user = await Vue.axios.get("http://localhost:8084/profile/getshort/" + op)
      let post = {
        "username": user.data.username,
        "name": user.data.display_name,
        "createdAt": content.data.createdAt,
        "content": content.data.content,
        "image": content.data.image
      }
      this.posts.push(post)
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