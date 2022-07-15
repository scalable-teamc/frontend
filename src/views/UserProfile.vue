<template>
  <div>
    <Nav class="nav"/>
    <NewPost/>

    <div class="body">

      <div class="profile">
        <img src="../assets/tweetie.png" width="200px" v-if="!image">
        <img :src="image" width="200px" v-else>
        <h3>{{ name }}</h3>
        <p>@{{ username }}</p>
        <p>{{ desc }}</p>
      </div>

      <p>{{ following.length }} Following &nbsp; {{ follower.length - 1 }} Followers</p>

      <Post v-for="post in posts" :key="post.postID" :postID="post.postID" :username="post.username" :name="post.name"
            :created-at="post.createdAt" :content="post.content" :image="post.image" :is-saved="false"
            :is-liked="post.isLiked">{{ post }}
      </Post>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import Post from "../components/Post.vue"
import NewPost from "../components/NewPost.vue"
import Vue from "vue";
import store from "@/store";

export default {
  props: ["uid", "username"],
  watch: {
    user() {
      if (this.username !== this.curUser) {
        this.$forceUpdate()
      }
      this.curUser = this.username
      return this.user()
    }
  },
  data() {
    return {
      name: "",
      image: "",
      desc: "",
      following: [],
      follower: ["dummmy"],
      all: null,
      posts: [],
      offset: 0,
      curUser: ""
    }
  },
  components: {Nav, Post, NewPost},
  async created() {
    let profile = await Vue.axios.post("http://localhost:8084/profile/getprof", {
      "uid": this.uid,
      "username": this.username
    });
    console.log(profile.data)
    this.name = profile.data.display_name
    this.image = profile.data.picture
    this.desc = profile.data.description
    this.following = profile.data.following
    this.follower = profile.data.follower

    let postRes = await Vue.axios.get("http://localhost:5466/user-post/" + this.uid)
    this.all = postRes.data
    this.posts = await this.loadPosts()
    this.scroll()
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
  margin: 0 50px 0 150px;
  min-height: 100vh;
  padding: 10px;
}

img {
  /*display: block;*/
  margin-top: 30px;
}

textarea {
  resize: none;
  width: 300px;
  border: darkgray solid 1px;
}

a {
  position: absolute;
  right: 2%;
  top: 2%;
}

button {
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 2px;
}
</style>