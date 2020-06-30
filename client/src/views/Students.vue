<template>
  <div>
    <h1>Students</h1>
    <CustomTable
      :tableData="students"
      :headers="headers"
      :loading="loading"
      :viewItem="goStudentProfile"
    />
  </div>
</template>

<script>
import StudentService from "../services/StudentService";
import CustomTable from "@/components/CustomTable";
export default {
  components: {
    CustomTable
  },

  data() {
    return {
      loading: true,
      students: [],
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
    StudentService.GetAllStudents().then(students => {
      this.students = students;
      this.loading = false;
    });
  },

  methods: {
    goStudentProfile(student) {
      this.$router.push({
        name: "StudentProfile",
        params: { studentId: student._id }
      });
    }
  }
};
</script>

<style>
</style>