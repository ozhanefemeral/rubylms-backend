<template>
  <v-dialog persistent v-model="show" max-width="720">
    <v-card>
      <v-tabs fixed-tabs background-color="primary" dark>
        <v-tab>
          General
        </v-tab>
        <v-tab>
          Questions
        </v-tab>
        <v-tab>
          Responsibles
        </v-tab>
        <v-tab-item>
          <v-card tile elevation="0">
            <v-card-text>
              <v-text-field
                prepend-inner-icon="mdi-pen"
                label="Name"
                outlined
                v-model="name"
              ></v-text-field>
              <v-col sm="3" cols="12" offset-sm="9">
                <v-text-field
                  v-model="chances"
                  label="Chances"
                  outlined
                  type="number"
                  min="1"
                  max="5"
                >
                </v-text-field>
              </v-col>
              <div class="mt-5">
                Add only PDF documents!
                <v-file-input
                  label="Add Document"
                  accept=".pdf"
                  v-model="document"
                ></v-file-input>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card elevation="0">
            <v-card-text>
              Total Mark is: {{ totalMark }}
              <v-card
                outlined
                class="my-5"
                v-for="(q, index) in questions"
                :key="index"
                style="border: 1.5px solid rgb(0,0,0, 0.7);"
              >
                <v-card-text>
                  <v-textarea
                    prepend-inner-icon="mdi-pencil"
                    outlined
                    :label="'Question ' + (index + 1)"
                    v-model="q.text"
                    :auto-grow="true"
                    rows="1"
                  ></v-textarea>
                  <v-row align="center">
                    <v-switch
                      @change="changeAnswerType(index)"
                      :label="q.answerType"
                      class="mx-5"
                    ></v-switch>
                    <v-col sm="3" cols="12">
                      <v-text-field
                        v-model="q.points"
                        prepend-inner-icon="mdi-star-circle"
                        type="number"
                        min="0"
                        max="100"
                        label="Points"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-textarea
                    outlined
                    rows="1"
                    auto-grow
                    label="Answer"
                    v-if="q.answerType == 'Classical'"
                    v-model="q.answer"
                  ></v-textarea>
                  <div v-else>
                    <v-row justify="center" align="center">
                      <v-col>
                        <v-btn
                          class="my-3"
                          @click="addChoice(q)"
                          tile
                          block
                          color="primary"
                        >
                          Add Choice
                        </v-btn>
                      </v-col>
                      <v-col>
                        <v-select
                          outlined
                          color="accent"
                          label="Answer"
                          :disabled="q.choices.length == 0"
                          :items="q.choices"
                          v-model="q.answer"
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-row class="px-3 my-3">
                      <v-col
                        cols="12"
                        sm="3"
                        v-for="(c, cIndex) in q.choices"
                        :key="cIndex"
                      >
                        <v-textarea
                          rows="1"
                          auto-grow
                          outlined
                          color="accent"
                          :background-color="checkCorrect(q, c)"
                          :label="'Choice ' + String.fromCharCode(65 + cIndex)"
                          v-model="q.choices[cIndex]"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>
              <v-btn tile block color="success" @click="addQuestion">
                Add Question
              </v-btn>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card tile elevation="0" height="500px">
            <v-card-text>
              <p>Is it only for selected students?</p>
              <v-switch
                v-model="special"
                :label="special.toString()"
              ></v-switch>
              <v-autocomplete
                v-if="special"
                label="Students"
                chips
                multiple
                :items="students"
                item-text="name"
                item-value="_id"
                v-model="selectedStudents"
              >
              </v-autocomplete>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
      <v-card-actions>
        <v-btn color="success" tile @click="createTask">Save</v-btn>
        <v-btn color="warning" tile @click.stop="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TaskService from "../services/TaskService";
// import CourseService from "../services/CourseService";
import FileService from "../services/FileService";
export default {
  props: ["value", "students", "course"],

  data() {
    return {
      e1: 1,
      date: "",
      time: "",
      name: "",
      document: undefined,
      questions: [],
      chances: 1,
      special: false,
      selectedStudents: []
    };
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },

    totalMark() {
      let total = 0;
      this.questions.forEach(q => {
        total += parseFloat(q.points);
      });
      return total;
    }
  },

  watch: {
    document(val) {
      console.log(val);
    },

    chances(val) {
      console.log(val);
      if (val < 1 || val > 5) {
        this.chances = 1;
      }
    }
  },

  methods: {
    addQuestion() {
      this.questions.push({
        text: "Q1",
        answer: "",
        points: 0,
        answerType: "Classical",
        choices: []
      });
    },

    addChoice(q) {
      q.choices.push(String.fromCharCode(65 + q.choices.length));
    },

    changeAnswerType(i) {
      let q = this.questions[i];

      if (q.answerType === "Classical") {
        q.answerType = "Test";
      } else {
        q.answerType = "Classical";
      }

      this.$set(this.questions, i, q);
    },

    async createTask() {
      let task = {
        name: this.name,
        questions: this.questions,
        isOnlyOnce: this.isOnlyOnce,
        responsibles: this.students,
        course: this.course
      };

      if (this.special) {
        task.responsibles = this.selectedStudents;
      }

      if (this.document) {
        const document = await FileService.UploadFile(this.document);
        task.document = document;
      }

      TaskService.CreateTask(task, this.document).then(task => {
        console.log(task);
        this.value = false;
      });
    },

    cancel() {
      this.e1 = 1;
      this.date = "";
      this.time = "";
      this.document = undefined;
      this.questions = [];
      this.special = false;
      this.selectedStudents = [];
      this.show = false;
    },

    checkCorrect(q, c) {
      return q.answer == c ? "success" : "";
    }
  }
};
</script>