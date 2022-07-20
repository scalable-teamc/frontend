<template>
  <div class="container">
    <Nav class="nav"/>
    <NewPost class="new"/>
    <a href="#"><p class="notification" @click="resetNew" v-if="newPost.length > 0">{{ newPost.length }} new posts</p>
    </a>
    <div class="body">
      <h2>Feed</h2>
      <Post v-for="post in posts" :key="post.postID" :postID="post.postID" :username="post.username" :name="post.name"
            :created-at="post.createdAt" :content="post.content" :image="post.image" :is-saved="false"
            :is-liked="post.isLiked" :profile-pic="post.profilePic">{{ post }}
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
import {socket} from "@/socket/io.js"
import {Circle8} from 'vue-loading-spinner'
import axios from "axios";

export default {
  components: {Nav, Post, NewPost, Circle8},
  async mounted() {
    // this.socket = io.connect('http://localhost:5000')
    console.log(sessionStorage.getItem('token'))
    socket.on(this.$store.state.uid, async (data) => {
      this.offset += 1
      await this.getPost(data.postID, true)
    })

    this.posts = await this.loadPosts()
    this.center = false
    this.scroll()
  },
  data() {
    return {
      posts: [],
      offset: 0,
      newPost: [],
      center: true,
      bottom: false
    }
  },
  methods: {
    resetNew() {
      this.posts.unshift(...this.newPost)
      this.newPost = []
    },
    async getPost(postID, isNew) {
      const profileURI = "/profile"
      const getURI = "/get"
      // let content = await axios.get("http://localhost:5466/get/" + postID + "/" + this.$store.state.uid)
      let content = await axios.get(getURI + "/" + postID + "/" + this.$store.state.uid)
      let op = content.data.userID
      let user = await axios.get(profileURI + "/getshort/" + op)
      let post = {
        "postID": postID,
        "username": user.data.username,
        "name": user.data.display_name,
        "profilePic": user.data.picture,
        "createdAt": content.data.createdAt,
        "content": content.data.content,
        "image": content.data.image,
        "isLiked": content.data.isLiked
      }
      if (isNew) {
        this.newPost.unshift(post)
      } else {
        return post
      }
    },
    async loadPosts(more) {
      const feedURI = "/feed/all"
      let feed = await axios.post(feedURI, {
        "uid": this.$store.state.uid,
        "offset": this.offset
      })
      let temp = []
      if (feed.data.length > 0 && more) {
        this.bottom = true
      }
      for (let index in feed.data) {
        temp.push(await this.getPost(feed.data[index], false))
      }
      return temp
    },
    scroll() {
      window.onscroll = async () => {
        let bottomOfWindow = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.offset += 10
          let more = await this.loadPosts(true)
          if (more.length > 0) {
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

.notification {
  background-color: #ffec8f;
  width: 120px;
  height: 20px;
  float: top;
  position: -webkit-sticky;
  position: sticky;
  top: 15px;
  margin: auto auto auto 45%;
  border-radius: 10px;
  color: black;
  padding: 5px;
}

p {
  margin: auto;
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