<template>
  <div class="container">
    <ul>
      <li class="icon">
        <div class="rounded"><img src="../assets/tweetie1.png"/></div>
      </li>
      <li>
        <b-icon icon="house"></b-icon>
      </li>
      <li>
        <b-icon icon="bell"></b-icon>
      </li>
      <li>
        <b-icon icon="envelope"></b-icon>
      </li>
      <li>
        <b-icon icon="archive"></b-icon>
      </li>
      <li>
        <b-icon icon="person"></b-icon>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  background-color: #ffc400;
  width: 90px;
  height: 100vh;
  position: sticky;
  float: left;
  margin: 0;
}

.rounded {
  border-radius: 50%;
  width: fit-content;
  background-color: white;
  margin: auto;
  padding: 6px;
}

img {
  height: 60px;
}

li {
  height: 60px;
  padding: 5px;
  cursor: pointer;
}

ul {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}

.icon {
  height: 90px;
}

svg {
  width: 28px;
  height: 28px;
  margin-top: 10px;
}
</style>