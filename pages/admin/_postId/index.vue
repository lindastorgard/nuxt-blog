<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import AdminPostForm from '@/components/Admin/AdminPostForm';

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },
  asyncData(context) {
    return axios
      // postId because the folder is called _postId
      .get('https://nuxt-blog-95373.firebaseio.com/posts/' + context.params.postId + '.json')
      .then(response => {
        return {
          loadedPost: {...response.data, id: context.params.postId}
        };
      })
      .catch(error => context.error(error));
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch('editPost', editedPost)
      .then(() => {
        this.$router.push('/admin');
      });
    }
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
