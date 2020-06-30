<template>
  <div>
    <h1 v-if="course != undefined">
      {{ course.name }} - {{ course.teachers[0].name }} - {{ courseAverage }}
    </h1>
    <v-divider class="my-5"></v-divider>
    <v-btn tile color="primary" @click="showCreateTask = true"
      >Create Task</v-btn
    >
    <v-btn tile color="accent" class="ml-5" @click="showStudents = true"
      >View Students</v-btn
    >
    <v-divider class="mt-5"></v-divider>

    <v-dialog v-model="showStudents" width="500">
      <span v-if="course">
        <CustomTable
          :tableData="course.students"
          :headers="headers"
          :loading="loading"
          :viewItem="goStudentProfile"
        />
      </span>
    </v-dialog>

    <v-divider></v-divider>
    <v-row v-if="course != undefined">
      <v-col
        sm="12"
        md="6"
        lg="3"
        v-for="(task, index) in course.tasks"
        :key="index"
      >
        <v-card elevation="5" tile>
          <v-card-text>
            <p class="text-center text-h3 primary--text">{{ task.name }}</p>
            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Responsibles</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  {{ task.responsibles.length }}
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Solutions</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  {{ task.solutions.length }}
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Average</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  {{ averages[index].toFixed(2) }}
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-btn tile color="primary" @click="goTaskDetails(task)">
              <v-icon>mdi-magnify</v-icon>
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <CreateTask
      v-if="course != undefined"
      v-model="showCreateTask"
      :students="course.students"
      :course="courseId"
    />
  </div>
</template>

<script>
import CourseService from "../services/CourseService";
import CreateTask from "@/components/CreateTask";
import CustomTable from "@/components/CustomTable";

export default {
  components: {
    CreateTask,
    CustomTable
  },

  data() {
    return {
      loading: true,
      courseId: "",
      course: undefined,
      averages: [],
      showCreateTask: false,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        {
          text: "Average",
          value: "average"
        }
      ],
      showStudents: false
    };
  },

  created() {
    this.courseId = this.$route.params.courseId;
    const populateBody = [
      {
        path: "tasks",
        model: "Task",
        select: ["_id", "name", "responsibles", "solutions"],
        populate: {
          path: "solutions",
          model: "Solution",
          select: ["mark", "student"]
        }
      },
      { path: "students", model: "Student", select: ["_id", "name"] },
      { path: "teachers", model: "Teacher", select: ["_id", "name"] }
    ];
    CourseService.GetCourse(this.courseId, populateBody).then(course => {
      course.tasks.forEach(task => {
        let sum = 0;
        const length = task.solutions.length;
        for (let i = 0; i < length; i++) {
          const sol = task.solutions[i].mark;
          sum += sol;
        }

        const average = sum / length;
        this.averages.push(average);
      });
        this.loading = false;

      for (let i = 0; i < course.students.length; i++) {
        let student = course.students[i];
        let sum = 0;
        let solutions = [];

        course.tasks.forEach(c => {
          solutions.push(...c.solutions.filter(c => c.student === student._id));
        });

        solutions.forEach(s => {
          sum += s.mark;
        });

        course.students[i].average = (sum / solutions.length).toFixed(2);
      }
  
      this.course = course;
    });
  },

  computed: {
    courseAverage() {
      let sum = 0;
      this.averages.forEach(el => {
        sum += parseFloat(el);
      });
      return (sum / this.averages.length).toFixed(2);
    }
  },

  methods: {
    goTaskDetails(task) {
      this.$router.push({
        name: "TaskDetails",
        params: { taskId: task._id }
      });
    },

    goStudentProfile(student) {
      this.$router.push({
        name: "StudentProfile",
        params: { studentId: student._id }
      });
    }
  }
};
</script>

<style>
</style>