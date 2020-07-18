<template>
  <div>
    <v-card-text>
      <v-text-field
        label="Teacher name"
        v-model="newTeacherName"
        @keydown.enter="createTeacher"
      >
      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn tile color="success" :disabled="isDisabled" @click="createTeacher">
        Create
      </v-btn>
      <v-btn tile color="warning" @click="cancel">
        Cancel
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import TeacherService from "../services/TeacherService";
export default {
  data() {
    return {
      newTeacherName: ""
    };
  },

  methods: {
    createTeacher() {
      if (this.isDisabled) {
        return;
      }

      let tBody = {
        name: this.newTeacherName,
        school: this.$store.state.school
      };

      TeacherService.CreateTeacher(tBody).then(teacher => {
        this.newTeacherName = "";
        this.$emit("hideDialog", teacher);
      });
    },

    cancel() {
      this.newTeacherName = "";
      this.$emit("hideDialog");
    }
  },

  computed: {
    isDisabled() {
      return this.newTeacherName.length < 2;
    }
  }
};
</script>

<style>
</style>