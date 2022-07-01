<template>
  <div class="login">
    <div class="rounded m-5">
      <img src="@/assets/tweetie1.png"/>
    </div>
    <h1>Tweetie</h1>
    <form>
      <div>
        <b-icon icon="person-fill" scale="1.3"></b-icon>
        <input type="text" name="username" placeholder="username">
      </div>
      <div>
        <b-icon icon="key-fill" scale="1"></b-icon>
        <input type="password" name="password" placeholder="password">
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.rounded {
  border-radius: 50%;
  width: fit-content;
  background-color: white;
  margin: 60px auto auto auto;
  padding: 7px;
}

img {
  height: 90px;
}

input {
  font-size: 15px;
  margin: 5px;
}


button {
  margin: 20px;
  border: none;
  padding: 5px;
  background-color: black;
  color: white;
  border-radius: 5px;
}

.login {
  background-color: #ffc400;

}
</style>
