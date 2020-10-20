<template>
  <div>
    <v-btn tile color="error" class="mx-1" @click="restart">Restart!</v-btn>
    <v-divider class="my-5"> </v-divider>
    <v-row>
      <v-col cols="12" md="3" v-if="courses">
        <v-card elevation="2" outlined>
          <v-card-text>
            <v-select
              label="Courses"
              :items="courses"
              v-model="selectedCourse"
              :item-text="courseWithTeacher"
              :item-value="courseObj"
            >
            </v-select>
            <v-btn
              tile
              color="accent"
              :disabled="!selectedCourse"
              class="mr-5"
              @click="createTask"
            >
              Create Task
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" v-if="teachers">
        <v-card elevation="2" outlined>
          <v-card-text>
            <v-select
              label="Teachers"
              :items="teachers"
              v-model="selectedTeacher"
              item-text="name"
              item-value="_id"
            >
            </v-select>
            <v-btn
              tile
              color="accent"
              :disabled="!selectedTeacher"
              @click="createCourse"
            >
              Create Course
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import StudentService from "../services/StudentService";
import TeacherService from "../services/TeacherService";
import CourseService from "../services/CourseService";
// import config from "../../config/index";

const COURSE_NAMES = [
  "English,",
  "German",
  "French",
  "Russian",
  "Spanish",
  "Chinese",
  "Turkish",
  "Agriculture",
  "Literature",
  "Sociology",
  "Logic",
  "Mathematics",
  "Psychology",
  "Biology",
  "Public Speaking",
  "Linguistics",
  "Geography",
  "Programming",
];

export default {
  data() {
    return {
      students: [],
      teachers: [],
      courses: [],
      selectedCourse: null,
      selectedTeacher: null,
      loading: true,
    };
  },
  created() {
    let promises = [];

    promises.push(
      StudentService.GetAllStudents().then((students) => {
        this.students = students;
      })
    );

    promises.push(
      TeacherService.GetAllTeachers().then((teachers) => {
        this.teachers = teachers;
      })
    );

    const select = ["name", "_id", "teachers", "students"];
    const populate = [{ path: "teachers", model: "Teacher", select: ["name"] }];
    promises.push(
      CourseService.GetAllCourses(select, populate).then((courses) => {
        this.courses = courses;
      })
    );

    Promise.all(promises).then(() => {
      this.loading = false;
    });
  },

  methods: {
    restart() {
      this.loading = true;

      axios
        .delete(`/api/test/restart`)
        .then((res) => res.data)
        .then((data) => {
          this.students = data.students;
          this.teachers = data.teachers;
          this.courses = data.courses;
          this.loading = false;
          this.$store.commit("setSchool", data.school._id);
        });
    },

    createStudents() {},

    createTeacher() {},

    createCourse() {
      const rnd = Math.floor(Math.random() * COURSE_NAMES.length);
      const name = COURSE_NAMES[rnd];
      this.loading = true;

      const courseBody = {
        name,
        students: this.students,
        teachers: [this.selectedTeacher],
        school: this.$store.state.school,
      };

      CourseService.CreateCourse(courseBody).then((course) => {
        this.courses.push(course);
        this.loading = false;
      });
    },

    enrollStudents() {},

    createTask() {
      const body = {
        course: this.selectedCourse._id,
        responsibles: this.selectedCourse.students,
      };
      this.loading = true;

      axios
        .post(`/api/test/task`, body)
        .then((res) => res.data)
        .then(() => {
          this.loading = false;
        });
    },

    createSolutions() {},

    courseWithTeacher: (item) => {
      return item.name + " - " + item.teachers[0].name;
    },

    courseObj: (item) => item,
  },
};
</script>

<style>
</style>