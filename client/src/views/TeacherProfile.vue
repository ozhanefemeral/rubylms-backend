<template>
  <div>
    <v-card>
      <v-card-title>
        {{ this.teacher.name }}
      </v-card-title>
    </v-card>
    <v-row>
      <v-col sm="12" md="6" lg="3" v-for="(c, i) in teacher.courses" :key="i">
        <v-card elevation="5">
          <v-card-title>
            {{ c.name }}
          </v-card-title>
          <details>
            <summary>
              Details
              <v-icon></v-icon>
            </summary>
            <v-card-text> {{ c._id }} </v-card-text>
          </details>
        </v-card>
      </v-col>
    </v-row>
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