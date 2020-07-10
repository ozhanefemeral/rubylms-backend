<template>
  <div>
    <h1>
      Task Details - <span v-if="task"> {{ task.name }} - {{ average }}</span>
    </h1>
    <span v-if="task.document">
      <hr />
      <div class="my-2">
        Uploaded document :
        <a :href="document" target="_blank">
          {{ task.document }}
        </a>
      </div>
      <hr />
    </span>
    <v-row v-if="task != undefined">
      <v-col
        cols="12"
        md="6"
        lg="3"
        v-for="(resp, i) in task.responsibles"
        :key="i"
      >
        <v-card raised outlined tile>
          <v-card-title>
            {{ resp.name }}
            <v-btn color="primary" icon @click="goToStudentProfile(resp)">
              <v-icon>mdi-account-search</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-card
              outlined
              v-for="(sol, j) in task.solutions.filter(
                el => resp._id === el.student
              )"
              :key="j"
            >
              <v-card-text>
                <v-icon color="accent">mdi-star</v-icon> Mark: {{ sol.mark }}
                <br />
                <br />
                <v-icon color="accent">mdi-calendar-clock</v-icon> Solved At:
                {{ sol.solvedAt.substr(0, 10) }} -
                {{ sol.solvedAt.substr(12, 7) }}
              </v-card-text>
              <v-card-actions>
                <v-btn tile color="primary" @click="viewSolution(sol)">
                  <v-icon>mdi-magnify</v-icon>
                  View
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <SolutionDetails
      v-if="selectedSolution"
      :solution="selectedSolution"
      :student="selectedStudent"
      :task="task"
      v-model="showSolution"
    />
    
  </div>
</template>

<script>
import TaskService from "../services/TaskService";
import SolutionDetails from "../components/SolutionDetails";

export default {
  components: {
    SolutionDetails
  },

  data() {
    return {
      taskId: "",
      task: undefined,
      showSolution: false,
      selectedSolution: undefined,
      selectedStudent: undefined
    };
  },

  created() {
    this.taskId = this.$route.params.taskId;

    const populate = [
      {
        path: "solutions",
        model: "Solution"
      },
      {
        path: "responsibles",
        model: "Student",
        select: ["name", "_id"]
      }
    ];

    TaskService.GetTask(this.taskId, populate).then(task => {
      this.task = task;
      console.log(task);
    });
  },

  methods: {
    viewSolution(solution) {
      this.showSolution = true;
      this.selectedSolution = solution;
      for (let i = 0; i < this.task.responsibles.length; i++) {
        const el = this.task.responsibles[i];
        if (el._id === this.selectedSolution.student) {
          this.selectedStudent = el;
          break;
        }
      }
    },

    goToStudentProfile(item) {
      this.$router.push({
        name: "StudentProfile",
        params: { studentId: item._id }
      });
    }
  },

  computed: {
    average() {
      let sum = 0;
      const length = this.task.solutions.length;

      this.task.solutions.forEach(element => {
        sum += element.mark;
      });

      return sum / length;
    },

    document() {
      return "/api/files/" + this.task.document;
    }
  }
};
</script>

<style>
</style>