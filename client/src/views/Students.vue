<template>
  <div>
    <h1>Students</h1>
    <v-btn color="accent" tile @click.stop="showCustomDialog = true">
      Create Student
    </v-btn>
    <v-divider></v-divider>

    <CustomTable
      :tableData="students"
      :headers="headers"
      :loading="loading"
      :viewItem="goStudentProfile"
    />

    <customdialog v-model="showCustomDialog">
      <template #content>
        <CreateStudent @hideDialog="hideDialog" />
      </template>
    </customdialog>
  </div>
</template>

<script>
import StudentService from "../services/StudentService";
import CustomTable from "@/components/CustomTable";
import CreateStudent from "@/components/CreateStudent";
import customdialog from "@/components/CustomDialog";

export default {
  components: {
    CustomTable,
    customdialog,
    CreateStudent
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
      ],
      showCustomDialog: false
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
    },

    hideDialog(student) {
      this.showCustomDialog = false;
      if (student != undefined) {
        this.students.unshift(student);
      }
    }
  }
};
</script>

<style>
</style>