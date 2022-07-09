<template>
  <div class="post">
    <div>
      <div class="profile">
        <img src="../assets/tweetie.png" width="50px" v-if="!image">
        <img :src="image" width="50px" v-else>
        <p><{{ name }}@{{ username }}</p>
      </div>
      <span class="time">{{ createdAt }}</span>
    </div>
    <div class="content">
      <p>{{ content }}</p>
      <img :src="image">
    </div>
    <div class="action">
      <b-icon icon="heart"></b-icon>
      <!--      <b-icon icon="heart-fill" style="color: #fc3838"></b-icon>-->
      <!--      <b-icon icon="chat"></b-icon>-->
      <b-icon icon="reply"></b-icon>
      <b-icon icon="bookmark"></b-icon>
    </div>
  </div>

</template>

<script>
export default {
  props: ["username", "name", "createdAt", "content", "image"]
}
</script>

<style scoped>
.post {
  background-color: #f6f6f6;
  padding: 20px;
  border-radius: 4px;
  text-align: left;
  margin: 10px;
}

.profile {
  margin: 5px;
  display: grid;
  grid-template-columns: 60px 50%;
}

.time {
  position: relative;
  top: -40px;
  left: 80%;
}

.content {
  margin: 20px;
}

.action svg {
  margin-left: 40px;
  margin-right: 40px;
  cursor: pointer;
}
</style>

