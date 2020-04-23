<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest news</h1>
    </section>
    <PostList :posts="loadedPosts"/>
  </div>
</template>
// this is the home page
<script>
export default {
//postlist not imported or registered coz it's a global component in plugins/core-components.js
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>

<style scoped>
.intro {
  height: 420px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/images/sony-4808408_1920.jpg');
  background-position: bottom;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  bottom: 3%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: white;
  /* background-color: rgb(211, 211, 211); */
  padding-left: 10px;
  /* border-radius: 10px; */
  /* box-shadow: 3px 3px 3px black; */
  box-sizing: border-box;
  /* border: 1px solid black; */
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
