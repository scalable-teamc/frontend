<template>
  <div class="justify-content-center container">
    <Login/>
    <Register/>
  </div>
</template>

<script>
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"

export default {
  components: {Login, Register},
}
</script>

<style scoped>
.container {
  width: 700px;
  height: 430px;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
  display: grid;
  grid-template-columns: 50% 50%;
  border-radius: 1%;
  overflow: hidden;

}
</style>