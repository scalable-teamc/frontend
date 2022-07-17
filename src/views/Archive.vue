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
    </div>
    ©
  </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import Post from "../components/Post.vue"
import NewPost from "../components/NewPost.vue"
import Vue from "vue";

export default {
  components: {Nav, Post, NewPost},
  async created() {
    let response = await Vue.axios.post("http://localhost:8084/profile/archive", {"uid": this.$store.state.uid,})
    this.all = response.data
    this.posts = await this.loadPosts()
    this.scroll()
  },
  data() {
    return {
      all: [],
      posts: [],
      offset: 0
    }
  },
  methods: {
    async getPost(postID) {
      let content = await Vue.axios.get("http://localhost:5466/get/" + postID + "/" + this.$store.state.uid)
      let op = content.data.userID
      let user = await Vue.axios.get("http://localhost:8084/profile/getshort/" + op)
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
    async loadPosts() {
      let temp = []
      let slice = this.all.slice(this.offset, this.offset + 10)
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
  padding: 10px;
}
h2 {
  margin-top: 2px;
}
</style>