<template>
  <div>
    <Nav class="nav"/>
    <NewPost/>

    <div class="body">
      <a href="#" @click="edit">Edit Profile &nbsp;<b-icon icon="pen" scale="0.9"></b-icon>
      </a>

      <div class="profile" v-if="!editMode">
        <img src="../assets/tweetie.png" width="200px" v-if="!$store.state.image">
        <img :src="$store.state.image" width="200px" v-else>
        <h3>{{ $store.state.name }}</h3>
        <p>@{{ $store.state.username }}</p>
        <p>{{ $store.state.desc }}</p>
      </div>

      <div class="edit" v-else>
        <img src="../assets/tweetie.png" width="200px" v-if="!$store.state.img && !image">
        <img :src="image" width="200px" v-else>

        <input type="file" accept="image/png, image/jpeg" class="pic" @change="uploadPic">
        <input type="text" v-model="new_name" style="text-align: center">
        <p>@{{ $store.state.username }}</p>
        <textarea placeholder="About me ..." v-model="new_desc"></textarea>
        <div></div>
        <button class="cancel" @click="cancel">cancel</button>
        &nbsp;
        <button class="save" @click="saveProfile">save</button>
      </div>

      <p>{{ $store.state.following.length }} Following &nbsp; {{ $store.state.follower.length - 1 }} Followers</p>

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
import store from "@/store";
import {Circle8} from 'vue-loading-spinner'
import axios from "axios";

export default {
  data() {
    return {
      new_name: this.$store.state.name,
      new_desc: this.$store.state.desc,
      editMode: false,
      image: null,
      all: null,
      posts: [],
      offset: 0,
      center: true,
      bottom: false
    }
  },
  components: {Nav, Post, NewPost, Circle8},
  async mounted() {
    const profileURI = "/profile"
    const getURI = "/user-post"
    let follow = await axios.post("/profile/getfollow", {"uid": this.$store.state.uid})
    await this.$store.dispatch("setFollow", follow.data)

    let postRes = await axios.get("/user-post/" + this.$store.state.uid)
    this.all = postRes.data
    this.posts = await this.loadPosts()
    this.center = false
    this.scroll()
  },
  methods: {
    edit() {
      this.editMode = true
    },
    cancel() {
      this.editMode = false
    },
    async uploadPic(event) {
      const files = event.target.files
      if (files && files[0]) {
        const reader = new FileReader
        reader.onload = e => {
          this.image = e.target.result
        }
        await reader.readAsDataURL(files[0])
      }
    },
    async saveProfile() {
      let img = ""
      let ctype = ""
      if (this.image) {
        img = this.image.split(',')[1]
        ctype = this.image.substring(
            this.image.indexOf(":") + 1,
            this.image.lastIndexOf(";")
        );
      }
      let data = {
        "uid": this.$store.state.uid,
        "username": this.$store.state.username,
        "image": img,
        "type": ctype,
        "display_name": this.new_name,
        "description": this.new_desc
      }
      await store.dispatch("setProfile", {
        "name": this.new_name,
        "image": this.image,
        "desc": this.new_desc,
      })
      let response = await Vue.axios.post("/profile/save", data)
      this.editMode = false
    },
    async getPost(postID) {
      let content = await axios.get("/get/" + postID + "/" + this.$store.state.uid)
      let op = content.data.userID
      let user = await axios.get("/profile/getshort/" + op)
      return {
        "postID": postID,
        "username": user.data.username,
        "name": user.data.display_name,
        "profilePic": user.data.picture,
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

.cancel:hover {
  background-color: #f34444;
  color: white;
}

.save:hover {
  background-color: #1db45e;
  color: white;
}

.pic {
  display: block;
  margin: auto auto 10px 41%;
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