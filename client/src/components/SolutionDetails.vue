<template>
  <v-dialog v-model="show" max-width="700">
    <v-card>
<<<<<<< HEAD
      <v-card-title>
        <v-row> <v-icon>mdi-account</v-icon>{{ student.name }} </v-row>
        <br />
        <v-row> <v-icon>mdi-star</v-icon>{{ mark }} </v-row>
        <br />
=======
      <v-card-text class="text-h5 black--text">
        <v-row class="mb-2 pt-2">
          <v-icon color="accent">mdi-account</v-icon>
          <span class="ml-2">{{ student.name }}</span>
        </v-row>
        <v-row class="mb-2">
          <v-icon color="accent">mdi-star</v-icon>
          <span class="ml-2">{{ mark }}</span>
        </v-row>
        <v-row class="mb-2">
          <v-icon color="accent">mdi-calendar-clock</v-icon>
          <span class="ml-2">
            {{ solution.solvedAt.substr(0, 10) }} -
            {{ solution.solvedAt.substr(12, 7) }}
          </span>
        </v-row>
>>>>>>> c7d0be25c2fc3a553fe4880b76c326fd5046fa95
        <v-row>
          <v-spacer></v-spacer>
          <v-btn @click="updateSolution" color="success">Save</v-btn>
        </v-row>
      </v-card-text>
      <v-card outlined v-for="(q, i) in task.questions" :key="i">
        <v-card-text class="text-subtitle-1" :class="compareAnswerText(q, i)">
          <v-row>
            <v-col cols="10">
              <span class="text-h4">
                {{ q.text }}
              </span>
              <span v-if="q.answerType === 'Test'">
                <br />
                <details class="black--text">
                  <summary>
                    Choices
                  </summary>
                  <ul>
                    <li v-for="(c, j) in q.choices" :key="j">
                      {{ q.choices[j] }}
                      <br />
                    </li>
                  </ul>
                </details>
<<<<<<< HEAD
                <span>
                  Student Answer: {{ q.choices[solution.answers[i].value] }}
=======
                <span class="black--text">
                  Answer: {{ q.choices[q.answer] }}
>>>>>>> c7d0be25c2fc3a553fe4880b76c326fd5046fa95
                </span>
                <br />
                <span>
                  Student Answer: {{ q.choices[solution.answers[i].value] }}
                </span>
              </span>
              <span v-else>
                <br />
<<<<<<< HEAD
                <span> Student Answer: {{ solution.answers[i].value }} </span>
                <br />
=======
>>>>>>> c7d0be25c2fc3a553fe4880b76c326fd5046fa95
                <span class="black--text"> Answer: {{ q.answer }}</span>
                <br />
                <span> Student Answer: {{ solution.answers[i].value }} </span>
              </span>
              <span v-if="q.points">
                <br />
                Question Point: {{ q.points }}
              </span>
            </v-col>
            <v-col cols="2" justify="end" align="end">
              <v-icon size="3rem">{{ compareAnswerIcon(q, i) }}</v-icon>
              <br />
              <v-text-field
<<<<<<< HEAD
                type="number"
                v-model="solution.answers[i].points"
                outlined
              ></v-text-field>
=======
                class="mt-5"
                v-model="solution.answers[i].points"
                outlined
              >
              </v-text-field>
>>>>>>> c7d0be25c2fc3a553fe4880b76c326fd5046fa95
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          :disabled="solution.mark == mark"
          @click="updateSolution"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TaskService from "../services/TaskService";
<<<<<<< HEAD
=======

>>>>>>> c7d0be25c2fc3a553fe4880b76c326fd5046fa95
export default {
  props: ["solution", "student", "value", "task"],

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },

    mark() {
      let sum = 0;
      this.solution.answers.forEach(a => {
<<<<<<< HEAD
        sum += parseFloat(a.points);
      });
=======
        let points = parseFloat(a.points);

        if (!isNaN(points)) {
          sum += points;
        }
      });

      if (sum > 100) {
        sum = 100;
      }

>>>>>>> c7d0be25c2fc3a553fe4880b76c326fd5046fa95
      return sum;
    }
  },

  methods: {
    compareAnswerText(q, i) {
<<<<<<< HEAD
      const isCorrect = q.answer == this.solution.answers[i].value;
=======
      const isCorrect = this.solution.answers[i].points > 0;
>>>>>>> c7d0be25c2fc3a553fe4880b76c326fd5046fa95
      return {
        "black--text": q.answer == undefined,
        "success--text": isCorrect,
        "error--text": !isCorrect
      };
    },

    compareAnswerIcon(q, i) {
      const isCorrect = this.solution.answers[i].points > 0;
      return isCorrect ? "mdi-check-circle" : "mdi-close-circle";
    },

    updateSolution() {
<<<<<<< HEAD
      TaskService.UpdateSolution(this.solution._id, this.solution).then(res => {
        console.log(res.data);
      });
=======
      TaskService.UpdateSolution(this.solution._id, this.solution).then(
        updatedSolution => {
          console.log(updatedSolution);
        }
      );
>>>>>>> c7d0be25c2fc3a553fe4880b76c326fd5046fa95
    }
  }
};
</script>