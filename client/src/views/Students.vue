<template>
  <div>
    <h1>Students</h1>
    <CustomTable :tableData="students" :headers="headers" />
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
      console.log(this.students);
    });
  }
};
</script>

<style>
</style>