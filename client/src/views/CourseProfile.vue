<template>
  <div>
    <h1>{{ courseId }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseId: ""
    };
  },

  created() {
    this.courseId = this.$route.params.courseId;
  }
};
</script>

<style>
</style>