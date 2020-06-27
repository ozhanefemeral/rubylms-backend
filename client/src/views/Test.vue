<template>
  <div>
    <v-btn color="primary" class="mx-5" @click="restart">Restart!</v-btn>
    <!-- <v-btn color="primary" class="mr-5"></v-btn>
    <v-btn color="primary" class="mr-5"></v-btn>
    <v-btn color="primary" class="mr-5"></v-btn> -->
  </div>
</template>

<script>
import axios from "axios";
// import config from "../../config/index";

export default {
  methods: {
    restart() {
      axios
        .delete(`/api/test/restart`)
        .then(res => res.data)
        .then(data => {
          console.log(data);
          this.$store.commit("setSchool", data.school._id);
          //   this.$router.go();
        });
    },

    createStudents() {},

    createTeacher() {},

    createCourse() {},

    enrollStudents() {},

    createTask() {},

    createSolutions() {}
  }
};
</script>

<style>
</style>