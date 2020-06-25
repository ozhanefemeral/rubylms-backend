<template>
  <div>
    <h1>Teachers</h1>
    <CustomTable
      :tableData="teachers"
      :headers="headers"
      :loading="loading"
      :viewItem="viewItem"
    />
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
      loading: true,
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
      this.loading = false;
    });
  },

  methods: {
    viewItem(item) {
      this.$router.push({
        name: "TeacherProfile",
        params: { teacherId: item._id }
      });
    }
  }
};
</script>

<style>
</style>