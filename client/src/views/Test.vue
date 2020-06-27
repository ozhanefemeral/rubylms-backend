<template>
  <div>
    <v-btn color="primary" class="mx-5" @click="restart">Restart!</v-btn>
    <v-btn color="primary" class="mr-5" @click="createTask">Create Task</v-btn>
    <!-- <v-btn color="primary" class="mr-5"></v-btn>
    <v-btn color="primary" class="mr-5"></v-btn> -->
  </div>
</template>

<script>
import axios from "axios";
import StudentService from "../services/StudentService";
import TeacherService from "../services/TeacherService";
import CourseService from "../services/CourseService";
// import config from "../../config/index";

export default {
  data() {
    return {
      students: [],
      teachers: [],
      courses: []
    };
  },
  created() {
    StudentService.GetAllStudents().then(students => {
      this.students = students;
    });

    TeacherService.GetAllTeachers().then(teachers => {
      this.teachers = teachers;
    });

    CourseService.GetAllCourses().then(courses => {
      this.courses = courses;
    });
  },
  methods: {
    restart() {
      axios
        .delete(`/api/test/restart`)
        .then(res => res.data)
        .then(data => {
          this.students = data.students;
          this.teachers = data.teachers;
          this.courses = data.courses;

          this.$store.commit("setSchool", data.school._id);
          //   this.$router.go();
        });
    },

    createStudents() {},

    createTeacher() {},

    createCourse() {},

    enrollStudents() {},

    createTask() {
      const body = {
        course: this.courses[0]._id,
        responsibles: this.students
      };

      axios
        .post(`/api/test/task`, body)
        .then(res => res.data)
        .then(data => {
          console.log(data);
        });
    },

    createSolutions() {}
  }
};
</script>

<style>
</style>