<template>
  <div>
    <h1>Students</h1>
    <CustomTable
      :tableData="courses"
      :headers="headers"
      :loading="loading"
      :viewItem="viewItem"
    />
  </div>
</template>

<script>
import CourseService from "../services/CourseService";
import CustomTable from "@/components/CustomTable";
export default {
  components: {
    CustomTable
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
        }
      ]
    };
  },

  created() {
    CourseService.GetAllCourses().then(courses => {
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