<template>
  <div>
    <v-btn tile color="primary" @click="showCreateCourse = true">
      Create Course
    </v-btn>

    <v-divider class="my-2"></v-divider>

    <CustomTable
      :tableData="courses"
      :headers="headers"
      :loading="loading"
      :viewItem="viewItem"
    />

    <customdialog v-model="showCreateCourse">
      <template #content>
        <CreateCourse @hideDialog="hideDialog" />
      </template>
    </customdialog>
  </div>
</template>

<script>
import CourseService from "../services/CourseService";
import CustomTable from "@/components/CustomTable";
import CreateCourse from "@/components/CreateCourse";
import customdialog from "@/components/CustomDialog";

export default {
  components: {
    CustomTable,
    CreateCourse,
    customdialog
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
      showCreateCourse: false,
      newCourseName: "",
      selectedTeachers: []
    };
  },

  created() {
    const select = ["name", "_id", "teachers", "students"];
    const populate = [{ path: "teachers", model: "Teacher", select: ["name"] }];
    CourseService.GetAllCourses(select, populate).then(courses => {
      courses.forEach(element => {
        element.teachers = element.teachers.map(t => " " + t.name);
      });
      courses = courses.reverse();
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
    },

    hideDialog(course) {
      this.showCreateCourse = false;
      if (course != undefined) {
        this.courses.unshift(course);
      }
    }
  }
};
</script>

<style>
</style>