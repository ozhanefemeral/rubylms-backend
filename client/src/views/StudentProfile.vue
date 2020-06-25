<template>
  <div>
    <h1>{{ studentId }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentId: ""
    };
  },

  created() {
    this.studentId = this.$route.params.studentId;
  }
};
</script>

<style>
</style>