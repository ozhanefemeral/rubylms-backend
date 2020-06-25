<template>
  <div>
    <h1>Teachers</h1>
    <CustomTable :tableData="teachers" :headers="headers" />
  </div>
</template>

<script>
import TeacherService from "../services/TeacherService";
import CustomTable from "@/components/CustomTable";
export default {
  components: {
    CustomTable
  },

  data() {
    return {
      teachers: [],
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
    TeacherService.GetAllTeachers().then(teachers => {
      this.teachers = teachers;
      console.log(this.teachers);
    });
  }
};
</script>

<style>
</style>