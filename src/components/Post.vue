<template>
  <div class="post">
    <div class="profile">
      <b-icon icon="person-fill"></b-icon>
      <span>Display Name</span>
      <span>@{{ username }}</span>
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
  props: ["username", "createdAt", "content", "image"]
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
}

span {
  margin: 3px;
}

.profile svg {
  margin-right: 10px;
}

.time {
  float: right;
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

