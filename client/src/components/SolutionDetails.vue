<template>
  <v-dialog v-model="show" max-width="700">
    <v-card>
      <v-card-title>
        <v-row> <v-icon>mdi-account</v-icon>{{ student.name }} </v-row>
        <br />
        <v-row> <v-icon>mdi-star</v-icon>{{ solution.mark }} </v-row>
        <br />
        <v-row>
          <v-icon>mdi-calendar-clock</v-icon>
          {{ solution.solvedAt.substr(0, 10) }} -
          {{ solution.solvedAt.substr(12, 7) }}
        </v-row>
      </v-card-title>
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
                  <summary>Choices </summary>
                  <ul>
                    <li v-for="(c, j) in q.choices" :key="j">
                      {{ q.choices[j] }}
                      <br />
                    </li>
                  </ul>
                </details>
                <span>
                  Student Answer: {{ q.choices[solution.answers[i]] }}
                </span>
                <br />
                <span class="black--text">
                  Answer: {{ q.choices[q.answer] }}</span
                >
              </span>
              <span v-else>
                <br />
                <span> Student Answer: {{ solution.answers[i] }} </span>
                <br />
                <span class="black--text"> Answer: {{ q.answer }}</span>
              </span>
              <span v-if="q.points">
                <br />
                Question Point: {{ q.points }}
              </span>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-icon size="3rem">{{ compareAnswerIcon(q, i) }}</v-icon>
              <br />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
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
    }
  },

  methods: {
    compareAnswerText(q, i) {
      const isCorrect = q.answer == this.solution.answers[i];
      return {
        "black--text": q.answer == undefined,
        "success--text": isCorrect,
        "error--text": !isCorrect
      };
    },

    compareAnswerIcon(q, i) {
      const isCorrect = q.answer == this.solution.answers[i];
      return isCorrect ? "mdi-check-circle" : "mdi-close-circle";
    }
  }
};
</script>