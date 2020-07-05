<template>
  <v-dialog v-model="show">
    <v-card>
      <v-card-text>
        <v-card-title></v-card-title>
        <v-text-field label="Course Name" v-model="courseName"> </v-text-field>
        <v-select
          label="Teachers"
          multiple
          :items="teachers"
          item-text="name"
          item-value="_id"
          v-model="selectedTeachers"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn tile color="primary" :disabled="!canCreate" @click="create">Create</v-btn>
        <v-btn tile color="warning">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TeacherService from "../services/TeacherService";
import CourseService from "../services/CourseService";
export default {
  props: ["value", "students", "course"],

  data() {
    return {
      courseName: "",
      selectedTeachers: [],
      teachers: []
    };
  },

  created() {
    TeacherService.GetAllTeachers().then(teachers => {
      this.teachers = teachers;
    });
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },

    canCreate() {
      return this.selectedTeachers.length > 0 && this.courseName.length >= 3
        ? true
        : false;
    }
  },

  methods: {
    create() {
      CourseService.CreateCourse({
        name: this.courseName,
        teachers: this.selectedTeachers,
        school: this.$store.state.school
      }).then(course => {
        console.log(course);
      });
    }
  }
};
</script>

<style>
</style>