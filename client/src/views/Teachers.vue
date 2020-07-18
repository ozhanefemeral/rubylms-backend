<template>
  <div>
    <v-btn tile color="primary" @click="showCreateTeacher = true">
      Create Teacher
    </v-btn>

    <v-divider class="my-2"></v-divider>

    <customdialog v-model="showCreateTeacher">
      <template #content>
        <CreateTeacher @hideDialog="hideDialog" />
      </template>
    </customdialog>

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
import customdialog from "@/components/CustomDialog";
import CreateTeacher from "@/components/CreateTeacher";

export default {
  components: {
    CustomTable,
    CreateTeacher,
    customdialog
  },

  data() {
    return {
      showCreateTeacher: false,
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
    },

    hideDialog(teacher) {
      this.showCreateTeacher = false;
      if (teacher != undefined) {
        this.teachers.unshift(teacher);
      }
    }
  }
};
</script>

<style>
</style>