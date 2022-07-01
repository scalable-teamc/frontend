<template>
  <div class="post">
    <div class="profile">
      <b-icon icon="person-fill"></b-icon>
      <span>John Doe</span>
      <span>@johndoe123</span>
      <span class="time">15:05 28/05/2022</span>
    </div>
    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur dicta dolor doloremque eius
      eveniet ex excepturi facilis id incidunt inventore itaque iusto laboriosam laborum modi molestias nemo neque nihil
      nobis odio, omnis optio pariatur porro quas quia quidem quis reiciendis sequi tempora tempore totam veritatis
      voluptatibus. Dolor, sint.
    </div>
    <div class="action">
      <b-icon icon="heart"></b-icon>
<!--      <b-icon icon="chat"></b-icon>-->
      <b-icon icon="reply"></b-icon>
      <b-icon icon="bookmark"></b-icon>
    </div>
  </div>

</template>

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

