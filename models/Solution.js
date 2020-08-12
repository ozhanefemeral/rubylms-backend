const mongoose = require('mongoose');
const Schema = mongoose.Schema

const solutionSchema = new Schema({
    answers: [Object],
    // answers: [{
    //     value: {
    //         type: String,
    //         default: ""
    //     },
    //     points: {
    //         type: Number,
    //         default: 0
    //     }
    // }],
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    duration: {
        type: Number,
        min: 0,
        default: 0
    },
    isAnswered: {
        type: Boolean,
        default: false
    },
    mark: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    solvedAt: {
        type: Date,
        default: Date.now()
    },
    comment: String
})

solutionSchema.pre('save', async function (next) {
    const task = await mongoose.model('Task').findById(this.task);

    let mark = 0;

    for (let index = 0; index < task.questions.length; index++) {
        const currentQuestion = task.questions[index];
        if (currentQuestion.answer == this.answers[index].value) {
            this.answers[index].points = currentQuestion.points;
        }

        let studentAnswer = currentQuestion.answer.toString().toLowerCase();

        if (studentAnswer == this.answers[index].value.toString().toLowerCase()) {
            studentAnswer.points = currentQuestion.points;
        }
    }

    this.answers.forEach(a => {
        mark += a.points;
    });


    this.mark = mark;
    task.solutions.push(this)
    await task.save()
    next();
})

const Solution = mongoose.model('Solution', solutionSchema);

module.exports = Solution;