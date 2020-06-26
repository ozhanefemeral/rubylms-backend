<template>
  <div>
    <h1>{{ course.name }} - {{ course.teachers[0] }}</h1>
    <v-divider class="my-5"></v-divider>
    <v-btn tile color="primary">Create Task</v-btn>
    <v-btn tile color="secondary" class="ml-5">Other</v-btn>
    <v-divider class="mt-5"></v-divider>
    <v-row class="ma-5">
      <v-col
        sm="12"
        md="6"
        lg="3"
        v-for="(task, index) in course.tasks"
        :key="index"
      >
        <v-card elevation="5" tile>
          <v-card-text>
            <p class="text-center text-h3 black--text">{{ task.name }}</p>
            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Responsibles</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  {{ task.solutions.length }}
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Solutions</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  {{ task.responsibles.length }}
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Average</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  {{ averages[index] }}
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-btn tile color="primary">
              <v-icon>mdi-magnify</v-icon>
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CourseService from "@/services/CourseService";
export default {
  data() {
    return {
      courseId: "",
      course: {},
      averages: []
    };
  },

  created() {
    this.courseId = this.$route.params.courseId;
    CourseService.GetCourse(this.courseId, true).then(course => {
      this.course = course;
      course.tasks.forEach(task => {
        let sum = 0;
        const length = task.solutions.length;
        for (let i = 0; i < length; i++) {
          const sol = task.solutions[i];
          sum += sol;
          console.log(sol);
        }

        const average = sum / length;
        this.averages.push(average.toFixed(2));
      });
    });
  }
};
</script>

<style>
</style>