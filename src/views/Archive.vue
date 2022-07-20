<template>
  <div class="container">
    <Nav class="nav"/>
    <NewPost class="new"/>
    <div class="body">
      <h2>Archive</h2>
      <Post v-for="post in posts" :key="post.postID" :postID="post.postID" :username="post.username" :name="post.name"
            :created-at="post.createdAt" :content="post.content" :image="post.image" :is-saved="true"
            :is-liked="post.isLiked">{{ post }}
      </Post>
      <div class="bottom">
        <Circle8 class="bottom" v-show="bottom"></Circle8>
      </div>
    </div>
    <Circle8 class="center" v-show="center"></Circle8>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import Post from "../components/Post.vue"
import NewPost from "../components/NewPost.vue"
import {Circle8} from 'vue-loading-spinner'
import axios from "axios";

export default {
  components: {Nav, Post, NewPost, Circle8},
  async mounted() {
    const profileURI = "/profile"
    let response = await axios.post(profileURI + "/archive", {"uid": this.$store.state.uid,})
    this.all = response.data
    this.posts = await this.loadPosts()
    this.center = false
    this.scroll()
  },
  data() {
    return {
      all: [],
      posts: [],
      offset: 0,
      center: true,
      bottom: false
    }
  },
  methods: {
    async getPost(postID) {
      const profileURI = "/profile"
      const getURI = "/get"
      // let content = await Vue.axios.get("http://localhost:5466/get/" + postID + "/" + this.$store.state.uid)
      let content = await axios.get(getURI + "/" + postID + "/" + this.$store.state.uid)
      let op = content.data.userID
      let user = await axios.get(profileURI + "/getshort/" + op)
      return {
        "postID": postID,
        "username": user.data.username,
        "name": user.data.display_name,
        "createdAt": content.data.createdAt,
        "content": content.data.content,
        "image": content.data.image,
        "isLiked": content.data.isLiked
      }
    },
    async loadPosts(more) {
      let temp = []
      let slice = this.all.slice(this.offset, this.offset + 10)
      if (slice.length > 0 && more) {
        this.bottom = true
      }
      for (let index in slice) {
        temp.push(await this.getPost(slice[index]))
      }
      return temp
    },
    scroll() {
      window.onscroll = async () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.offset += 10
          let more = await this.loadPosts(true)
          if (more) {
            this.posts.push(...more)
            this.bottom = false
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.body {
  width: 80%;
  margin: 0px 50px 0px 150px;
  min-height: 100vh;
  padding: 10px;
}
h2 {
  margin-top: 2px;
}
.center {
  position: absolute;
  top: 50%;
  left: 47%;
}

.bottom {
  position: -webkit-sticky;
  position: sticky;
  height: 50px;
  width: fit-content;
  left: 47%;
}
</style>