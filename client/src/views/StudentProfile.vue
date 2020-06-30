<template>
  <div>
    <h1>{{ studentId }}</h1>
  </div>
</template>

<script>
import StudentService from "../services/StudentService";
export default {
  data() {
    return {
      studentId: "",
      student: null
    };
  },

  created() {
    this.studentId = this.$route.params.studentId;
    StudentService.GetStudent(this.studentId).then(student => {
      this.student = student;
      console.log(student);
    });
  }
};
</script>

<style>
</style>