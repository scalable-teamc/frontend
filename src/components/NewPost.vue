<template>
  <div class="sticky">
    <div class="rounded" @click="$modal.show('post')">
      <p class="icon">+</p>
    </div>

    <modal name="post">
      <div class="new">
        <div class="grid">
          <img src="../assets/tweetie.png" width="50px">
          <p>John Doe</p>
        </div>
        <textarea placeholder="New Post ..." res></textarea>
      </div>
      <div class="buttons">
        <button @click="$modal.hide('post')">cancel</button>
        <button>post</button>
      </div>
    </modal>
  </div>
</template>


<style scoped>
.sticky {
  float: right;
  position: -webkit-sticky;
  position: sticky;
  top: 85%;
  right: 2%;
  cursor: pointer;
}
.rounded {
  border-radius: 50%;
  width: 65px;
  height: 65px;
  background-color: #ff8800;
}

.icon {
  padding: 4px;
  margin: auto;
  font-size: 50px;
  color: white;
}

.new {
  padding: 20px;
}

.grid {
  display: grid;
  width: 150px;
  grid-template-columns: auto auto;
}

textarea {
  width: 500px;
  height: 170px;
  border: none;
  display: block;
  margin: auto;
  resize: none;
}

.buttons {
  text-align: right
}

button {
  margin: 0 10px 5px 5px;
  padding: 7px;
  border: none;
  cursor: pointer;
}
</style>