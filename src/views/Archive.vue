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
      let content = await Vue.axios.get("http://localhost:5466/get/" + postID)
      let op = content.data.userID
      let user = await Vue.axios.get("http://localhost:8084/profile/getshort/" + op)
      return {
        "username": user.data.username,
        "name": user.data.display_name,
        "createdAt": content.data.createdAt,
        "content": content.data.content,
        "image": content.data.image
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
            console.log(this.posts)
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
}
</style>