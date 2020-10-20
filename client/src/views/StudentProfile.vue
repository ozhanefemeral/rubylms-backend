<template>
  <div>
    <v-btn @click="showEnrollDialog = true" color="primary" tile>Enroll Course</v-btn>
    <v-row v-if="student">
      <v-col cols="12" lg="6">
        <v-card raised>
          <v-card-title>Overall Performance</v-card-title>
          <v-card-text>
            <apexchart type="bar" :options="overallChartOptions" :series="overallSeries"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card raised>
          <v-card-title>Course Performance</v-card-title>
          <v-card-text>
            <v-select
              label="Enrolled Course"
              v-model="selectedCourse"
              :items="student.courses"
              item-text="name"
              item-value="_id"
            ></v-select>
            <apexchart type="line" :options="courseChartOptions" :series="courseSeries"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <customdialog v-model="showEnrollDialog">
      <template #content>
        <CustomTable
          :loading="loading"
          :tableData="allCourses"
          :headers="headers"
          selectable
          @itemSelected="onItemSelected"
        />
      </template>
      <template #actions>
        <v-btn color="success" tile @click="enroll">Enroll</v-btn>
      </template>
    </customdialog>
  </div>
</template>

<script>
import StudentService from "../services/StudentService";
import CourseService from "../services/CourseService";
import customdialog from "@/components/CustomDialog";
import CustomTable from "@/components/CustomTable";

export default {
  components: {
    customdialog,
    CustomTable,
  },

  data() {
    return {
      studentId: "",
      student: null,
      selectedCourse: null,
      datacollection: null,
      courseChartOptions: {
        chart: {
          id: "vuechart-example",
        },
        yaxis: {
          min: 0,
          max: 100.1,
        },
      },
      courseSeries: [],
      overallChartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          tickAmount: "dataPoints",
        },
      },
      overallSeries: [
        {
          name: "Student Average",
          data: new Array(),
        },
        {
          name: "Course Average",
          data: new Array(),
        },
      ],
      solutions: [],
      selectedCoursesEnroll: [],
      showEnrollDialog: false,
      allCourses: [],
      loading: true,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        {
          text: "Teacher",
          align: "start",
          value: "teachers",
        },
      ],
    };
  },

  created() {
    this.studentId = this.$route.params.studentId;

    const populateBody = [
      {
        path: "courses",
        model: "Course",
        select: ["_id", "name", "teacher"],
        populate: {
          path: "tasks",
          model: "Task",
          select: ["solutions", "name", "_id"],
          populate: {
            path: "solutions",
            model: "Solution",
            select: ["mark", "student"],
          },
        },
      },
    ];

    StudentService.GetStudent(this.studentId, populateBody).then((student) => {
      this.student = student;

      for (let i = 0; i < student.courses.length; i++) {
        const c = student.courses[i];
        let courseSum = 0;
        let studentCourseSum = 0;
        let solutionCount = 0;
        let studentSolutionCount = 0;
        let taskAverage = 0;

        for (let j = 0; j < c.tasks.length; j++) {
          let taskSum = 0;
          let t = c.tasks[j];

          for (let k = 0; k < t.solutions.length; k++) {
            const s = t.solutions[k];
            courseSum += s.mark;
            taskSum += s.mark;
            solutionCount++;
            if (s.student === this.studentId) {
              this.solutions.push({ ...s, courseId: c._id, taskName: t.name });
              studentCourseSum += s.mark;
              studentSolutionCount++;
            }
          }

          taskAverage = (taskSum / c.tasks.length).toFixed(2);
          t.average = taskAverage;
          this.student.courses[i].tasks.splice(j, 1, t);
        }

        let courseAverage = (courseSum / solutionCount).toFixed(2);
        let studentCourseAverage = (
          studentCourseSum / studentSolutionCount
        ).toFixed(2);

        let data0 = {
          x: c.name,
          y: studentCourseAverage,
        };

        let data1 = {
          x: c.name,
          y: courseAverage,
        };

        this.overallSeries[0].data.push(data0);
        this.overallSeries[1].data.push(data1);
      }

      console.log(student);
    });
  },

  watch: {
    selectedCourse() {
      const course = this.student.courses.find(
        (c) => c._id == this.selectedCourse
      );

      this.courseSeries = [
        {
          name: "Student Mark",
          data: new Array(),
        },
        {
          name: "Task Average",
          data: new Array(),
        },
      ];

      for (let i = 0; i < course.tasks.length; i++) {
        const task = course.tasks[i];

        let studentSolutions = task.solutions.filter(
          (s) => s.student === this.studentId
        );

        let sum = 0;
        studentSolutions.forEach((s) => {
          sum += s.mark;
        });

        let data0 = {
          x: task.name,
          y: sum / studentSolutions.length || 0,
        };

        let data1 = {
          x: task.name,
          y: task.average,
        };

        this.courseSeries[0].data.push(data0);
        this.courseSeries[1].data.push(data1);
      }
    },

    showEnrollDialog() {
      this.loading = true;
      if (this.showEnrollDialog && this.allCourses.length == 0) {
        const select = ["name", "_id", "teachers"];
        const populate = [
          { path: "teachers", model: "Teacher", select: ["name"] },
        ];
        CourseService.GetAllCourses(select, populate).then((courses) => {
          courses.forEach((element) => {
            element.teachers = element.teachers.map((t) => t.name + " ");
          });
          this.allCourses = courses;
          this.loading = false;
        });
      }
    },
  },

  methods: {
    enroll() {
      console.log(this.selectedCoursesEnroll);
      StudentService.EnrollStudent(this.studentId, this.selectedCoursesEnroll);
    },

    onItemSelected(selected) {
      this.selectedCoursesEnroll = selected.map((e) => e._id);
    },
  },
};
</script>

<style>
</style>