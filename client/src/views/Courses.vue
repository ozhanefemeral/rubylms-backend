<template>
  <div>
    <h1>Courses</h1>
    <v-btn color="accent" @click="showCreateCourse = true">Create Course</v-btn>

    <v-divider class="my-5"></v-divider>

    <CustomTable
      :tableData="courses"
      :headers="headers"
      :loading="loading"
      :viewItem="viewItem"
    />

    <CreateCourse v-model="showCreateCourse" />
  </div>
</template>

<script>
import CourseService from "../services/CourseService";
import CustomTable from "@/components/CustomTable";
import CreateCourse from "@/components/CreateCourse";

export default {
  components: {
    CustomTable,
    CreateCourse
  },

  data() {
    return {
      loading: true,
      courses: [],
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        {
          text: "Teacher",
          align: "start",
          value: "teachers"
        }
      ],
      showCreateCourse: false
    };
  },

  created() {
    CourseService.GetAllCourses().then(courses => {
      courses.forEach(element => {
        element.teachers = element.teachers.map(t => t.name + " ");
      });
      this.courses = courses;
      this.loading = false;
    });
  },

  methods: {
    viewItem(item) {
      this.$router.push({
        name: "CourseProfile",
        params: { courseId: item._id }
      });
    }
  }
};
</script>

<style>
</style>