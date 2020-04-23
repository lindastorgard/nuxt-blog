<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts"/>
  </div>
</template>
//this is the blog page
<script>
//postlist not imported or registered coz it's a global component in plugins/core-components.js

export default {
  // middleware: 'log',
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  },
 }

//  thumbnail: 'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg'

</script>

<style scoped>
.posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>