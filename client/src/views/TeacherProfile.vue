<template>
  <div>
    <v-card>
      <v-card-title>
        {{ this.teacher.name }}
      </v-card-title>
    </v-card>
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="(item, index) in teacher.courses" :key="index">
        <v-expansion-panel-header>{{ item.name }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import TeacherService from "../services/TeacherService";
export default {
  data() {
    return {
      teacherId: "",
      teacher: {}
    };
  },

  created() {
    this.teacherId = this.$route.params.teacherId;
    this.GetTeacher();
  },

  methods: {
    async GetTeacher() {
      TeacherService.GetTeacher(this.teacherId, true).then(teacher => {
        this.teacher = teacher;
      });
    }
  }
};
</script>

<style>
</style>