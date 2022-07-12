<template>
  <div class="container">
    <Nav class="nav"/>
    <NewPost class="new"/>
    Feed
    <div class="body">
      <Post v-for="post in posts" :key="post.postID" :postID="post.postID" :username="post.username" :name="post.name"
            :created-at="post.createdAt" :content="post.content" :image="post.image" :is-saved="false">{{ post }}
      </Post>
    </div>
    ©
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
  async created() {
    this.socket = io.connect('http://localhost:5000')
    this.socket.on('my_response', (data) => {
      console.log(data)
    })
    // this.socket.emit('online', this.$store.state.uid)
    this.socket.on(this.$store.state.uid, (data) => {
      this.getPost(data.postID, true)
    })

    this.posts = await this.loadPosts()
    this.scroll()
  },
  data() {
    return {
      posts: [],
      offset: 0
    }
  },
  methods: {
    async getPost(postID, isNew) {
      let content = await Vue.axios.get("http://localhost:5466/get/" + postID)
      let op = content.data.userID
      let user = await Vue.axios.get("http://localhost:8084/profile/getshort/" + op)
      let post = {
        "postID": postID,
        "username": user.data.username,
        "name": user.data.display_name,
        "createdAt": content.data.createdAt,
        "content": content.data.content,
        "image": content.data.image
      }
      if (isNew) {
        this.posts.unshift(post)
      } else {
        return post
      }
    },
    async loadPosts() {
      let feed = await Vue.axios.post("http://localhost:5000/feed/all", {
        "uid": this.$store.state.uid,
        "offset": this.offset
      })
      let temp = []
      for (let index in feed.data) {
        temp.push(await this.getPost(feed.data[index], false))
      }
      return temp
    },
    scroll() {
      window.onscroll = async () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.offset += 10
          let more = await this.loadPosts()
          if (more) {
            this.posts.push(...more)
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
}

/*.new {*/
/*  position: absolute;*/
/*  top: 85%;*/
/*  right: 2%;*/
/*}*/
</style>