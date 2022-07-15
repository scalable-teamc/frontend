<template xmlns="http://www.w3.org/1999/html">
  <div class="container">
    <ul>
      <li class="icon">
        <div class="rounded"><img src="../assets/tweetie1.png" class="logo"/></div>
      </li>
      <li>
        <router-link to="/home">
          <b-icon icon="house"></b-icon>
        </router-link>
      </li>
      <!--      <li>-->
      <!--        <b-icon icon="bell"></b-icon>-->
      <!--      </li>-->
      <!--      <li>-->
      <!--        <b-icon icon="envelope"></b-icon>-->
      <!--      </li>-->
      <li>
        <router-link to="/search">
          <b-icon icon="search" @click="$modal.show('follow')"></b-icon>
        </router-link>
      </li>
      <li>
        <router-link to="/archive">
          <b-icon icon="archive"></b-icon>
        </router-link>
      </li>
      <li>
        <router-link to="/profile">
          <b-icon icon="person"></b-icon>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.container {
  background-color: #ffc400;
  width: 80px;
  height: 100vh;
  float: left;
  margin: 0;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.rounded {
  border-radius: 50%;
  width: fit-content;
  background-color: white;
  margin: auto;
  padding: 6px;
}

.logo {
  height: 50px;
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