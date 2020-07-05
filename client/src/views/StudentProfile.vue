<template>
  <div>
    <v-row v-if="student">
      <v-col cols="12" lg="6">
        <v-card>
          <v-card-title>
            Course Performance
          </v-card-title>
          <v-card-text>
            <v-select
              label="Enrolled Course"
              v-model="selectedCourse"
              :items="student.courses"
              item-text="name"
              item-value="_id"
            ></v-select>
            <apexchart
              type="line"
              :options="courseChartOptions"
              :series="courseSeries"
            ></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card>
          <v-card-title>
            Overall Performance
          </v-card-title>
          <v-card-text>
            <apexchart
              type="line"
              :options="overallChartOptions"
              :series="overallSeries"
            ></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StudentService from "../services/StudentService";
import TaskService from "../services/TaskService";

export default {
  data() {
    return {
      studentId: "",
      student: null,
      selectedCourse: null,
      datacollection: null,
      courseChartOptions: {
        chart: {
          id: "vuechart-example"
        },
        yaxis: {
          min: 0,
          max: 100
        }
      },
      courseSeries: [],
      overallChartOptions: {
        chart: {
          id: "vuechart-example"
        }
      },
      overallSeries: [
        {
          name: "ders 1",
          data: [30, 40, 35, 50]
        },
        {
          name: "ders 2",
          data: [80, 90, 55, 20]
        }
      ],
      solutions: []
    };
  },

  created() {
    this.studentId = this.$route.params.studentId;
    const populateBody = [
      { path: "courses", model: "Course", select: ["_id", "name", "teacher"] }
    ];
    StudentService.GetStudent(this.studentId, populateBody).then(student => {
      this.student = student;

      this.selectedCourse = student.courses[0];

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
          this.solutions = solutions;
        }
      );
    });
  },

  watch: {
    selectedCourse() {
      if (this.solutions.length < 1) {
        return;
      }
      let filtered = this.solutions.filter(
        s => s.task.course._id === this.selectedCourse
      );

      this.courseSeries = [
        {
          name: "Mark",
          data: new Array(filtered.length).fill({ x: "", y: 0 })
        },
        {
          name: "Duration",
          data: new Array(filtered.length).fill({ x: "", y: 0 })
        }
      ];

      for (let i = 0; i < filtered.length; i++) {
        const f = filtered[i];
        let temp = {
          y: f.mark,
          x: f.task.name
        };
        this.$set(this.courseSeries[0].data, i, temp);
      }
    }
  }
};
</script>

<style>
</style>