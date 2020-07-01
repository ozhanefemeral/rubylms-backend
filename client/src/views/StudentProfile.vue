<template>
  <div>
    <h1>{{ studentId }}</h1>
    <div class="small">
      <line-chart :chart-data="datacollection"></line-chart>
      <button @click="fillData()">Randomize</button>
    </div>
  </div>
</template>

<script>
import StudentService from "../services/StudentService";
import TaskService from "../services/TaskService";
import LineChart from "../components/LineChart";

export default {
  components: {
    LineChart
  },

  data() {
    return {
      studentId: "",
      student: null,
      datacollection: null
    };
  },

  created() {
    this.studentId = this.$route.params.studentId;
    const populateBody = [
      { path: "courses", model: "Course", select: ["_id", "name", "teacher"] }
    ];
    StudentService.GetStudent(this.studentId, populateBody).then(student => {
      this.student = student;

      const select = ["task", "duration", "mark"];
      const populate = [
        {
          path: "task",
          model: "Task",
          select: ["name", "_id", "course"],
          populate: {
            path: "course",
            model: "Course",
            select: "name"
          }
        }
      ];

      TaskService.FindSolutions(student._id, select, populate).then(
        solutions => {
          console.log(solutions.length);
          solutions.forEach(s => {
            let temp = this.courses[s.task.course._id];
            temp["solutions"].push(s);
            this.$set(this.courses, s.course, temp);
          });
        }
      );
    });
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  },

  computed: {
    courses() {
      let temp = {};
      this.student.courses.forEach(element => {
        temp[element._id] = { name: element.name, solutions: [] };
      });
      return temp;
    }
  }
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>