<template>
  <div>
    <v-card-text>
      <v-text-field
        label="Student name"
        v-model="newStudentName"
        @keydown.enter="createStudent"
      >
      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn tile color="success" :disabled="isDisabled" @click="createStudent">
        Create
      </v-btn>
      <v-btn tile color="warning" @click="cancel">
        Cancel
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import StudentService from "../services/StudentService";
export default {
  data() {
    return {
      newStudentName: ""
    };
  },

  methods: {
    createStudent() {
      if (this.isDisabled) {
        return;
      }

      let sBody = {
        name: this.newStudentName,
        school: this.$store.state.school
      };

      StudentService.CreateStudent(sBody).then(student => {
        this.newStudentName = "";
        this.$emit("hideDialog", student);
      });
    },

    cancel() {
      this.newStudentName = "";
      this.$emit("hideDialog");
    }
  },

  computed: {
    isDisabled() {
      return this.newStudentName.length < 2;
    }
  }
};
</script>

<style>
</style>