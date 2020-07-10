<template>
  <div>
    <v-card-text>
      <v-text-field label="Course Name" v-model="courseName"> </v-text-field>
      <v-autocomplete
        label="Teachers"
        chips
        multiple
        :items="teachers"
        item-text="name"
        item-value="_id"
        v-model="selectedTeachers"
      >
      </v-autocomplete>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn tile color="primary" :disabled="!canCreate" @click="create">
        Create
      </v-btn>
      <v-btn tile color="warning" @click="cancel">Cancel</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import TeacherService from "../services/TeacherService";
import CourseService from "../services/CourseService";

export default {
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
        this.$emit("hideDialog", course);
      });
    },

    cancel() {
      this.$emit("hideDialog");
    }
  }
};
</script>

<style>
</style>