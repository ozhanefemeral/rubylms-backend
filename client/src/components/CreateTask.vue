<template>
  <v-dialog persistent v-model="show" max-width="600px">
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
              <v-text-field label="Name" outlined v-model="name"></v-text-field>
              <v-textarea
                v-model="description"
                label="Description"
                outlined
              ></v-textarea>
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
                  <v-row>
                    <v-col cols="1">{{ index }}</v-col>
                    <v-col>
                      <v-textarea
                        label="Question Text"
                        v-model="q.text"
                        :auto-grow="true"
                        rows="1"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-switch
                      @change="changeAnswerType(index)"
                      :label="q.answerType"
                      class="mx-5"
                    ></v-switch>
                    <v-text-field
                      label="Answer"
                      v-if="q.answerType == 'Classical'"
                      v-model="q.answer"
                      class="mx-5"
                    ></v-text-field>
                    <v-col cols="12" v-if="q.answerType == 'Test'">
                      <v-row
                        v-for="(choices, i) in q.choices"
                        :key="i"
                        align="center"
                        justify="center"
                      >
                        <v-col cols="10">
                          <v-textarea
                            rows="1"
                            auto-grow
                            :label="'Choice ' + String.fromCharCode(65 + i)"
                          ></v-textarea>
                        </v-col>
                        <v-checkbox></v-checkbox>
                        <v-btn icon color="error" @click="removeChoice(q, i)">
                          <v-icon>
                            mdi-delete
                          </v-icon>
                        </v-btn>
                      </v-row>
                      <v-col cols="12">
                        <v-btn block tile @click="addChoice(q)" color="accent">
                          Add Choice
                        </v-btn>
                      </v-col>
                    </v-col>
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
              <v-autocomplete
                v-if="special"
                label="Students"
                chips
                deletable-chips
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
      special: false,
      selectedStudents: [],
      description: ""
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

    addChoice(question) {
      console.log(question);
      question.choices.push("");
    },

    removeChoice(question, index) {
      question.choices.splice(index, 1);
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
        course: this.course,
        description: this.description
      };

      if (this.special) {
        task.responsibles = this.selectedStudents;
      }

      if (this.document) {
        const document = await FileService.UploadFile(this.document);
        task.document = document;
      }

      TaskService.CreateTask(task, this.document).then(() => {
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