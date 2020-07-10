<template>
  <v-dialog persistent v-model="show" width="50vw">
    <v-card>
      <v-card-text>
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
                  label="Name"
                  outlined
                  v-model="name"
                ></v-text-field>
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
                <v-card
                  outlined
                  class="my-5"
                  v-for="(q, index) in questions"
                  :key="index"
                >
                  <v-card-text>
                    <v-textarea
                      label="Question Text"
                      v-model="q.text"
                      :auto-grow="true"
                      rows="1"
                    ></v-textarea>
                    <v-row>
                      <v-switch
                        @change="changeAnswerType(index)"
                        :label="q.answerType"
                        class="mx-5"
                      ></v-switch>
                      <v-text-field
                        label="Answer"
                        :tick-labels="[2, 3, 4, 5]"
                        v-if="q.answerType == 'Classical'"
                        v-model="q.answer"
                        class="mx-5"
                      ></v-text-field>
                      <v-card-text> </v-card-text>
                    </v-row>
                  </v-card-text>
                </v-card>
                <v-btn tile block color="primary" @click="addQuestion">
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
                <v-select
                  multiple
                  v-if="special"
                  :items="students"
                  item-text="name"
                  item-value="_id"
                  v-model="selectedStudents"
                >
                </v-select>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
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
    }
  },

  watch: {
    document(val) {
      console.log(val);
    }
  },

  methods: {
    addQuestion() {
      this.questions.push({
        text: "",
        answer: "",
        answerType: "Classical",
        choices: []
      });
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

      console.log(task);

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
    }
  }
};
</script>