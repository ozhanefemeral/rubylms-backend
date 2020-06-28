const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const faker = require('faker/locale/en_GB');

const School = require('../models/School');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Task = require('../models/Task');
const Course = require('../models/Course');
const Solution = require('../models/Solution');

const STUDENT_COUNT = 10;

route.delete('/restart', async (req, res) => {
    let savePromises = [];

    await dropDB();
    const school = await createSchool();
    const teacher = await createTeacher(school);
    const students = await createStudents(school);
    const course = await createCourse(school, teacher, savePromises);
    await enrollStudents(students, course, savePromises);
    const task = await createTask(course, students, savePromises);
    await createSolutions(students, task, savePromises)

    Promise.all(savePromises)
        .then(res.send({ school, teacher, students, course }))
})

route.get('/school/', (req, res) => {
    School.find({})
        .then(schools => res.send(schools[0]))
});

async function dropDB() {
    return mongoose.connection.db.dropDatabase()
}

async function createSchool() {
    return School.create({
        name: 'Example School'
    });
}

async function createTeacher(school) {
    return Teacher.create({
        school,
        name: "Özhan Efe Meral",
        phone: "05375602191",
        password: "efemeral1"
    })
}

async function createStudents(school) {
    let studentPromises = [];

    studentPromises.push(Student.create({
        school,
        name: "Mesut Gedik",
        phone: "123",
        password: "123"
    }));

    for (let i = 0; i < STUDENT_COUNT - 1; i++) {
        studentPromises.push(Student.create({
            school,
            name: faker.name.findName(),
            phone: faker.phone.phoneNumber(),
            password: faker.internet.password
        }));
    }

    return await Promise.all(studentPromises);
}

async function createCourse(school, teacher, savePromises) {

    const course = await Course.create({
        school,
        teachers: [teacher],
        name: 'Example Course'
    })

    teacher.courses.push(course);
    savePromises.push(teacher.save());
    return course;
}

async function enrollStudents(students, course, savePromises) {

    students.forEach(element => {
        element.courses.push(course);
        savePromises.push(element.save())
    });

    course.students = students;
    savePromises.push(course.save());
}

route.post('/task', async (req, res) => {
    let promises = [];
    const { course, responsibles } = req.body;
    const courseDoc = await Course.findById(course);
    const task = await createTask(courseDoc, responsibles, promises);
    await createSolutions(responsibles, task, promises);

    Promise.all(promises)
        .then(() => {
            res.send(task)
        })
})

async function createTask(course, students, savePromises) {
    const taskBody = generateTask();
    const task = await Task.create({
        ...taskBody,
        course,
        responsibles: students
    })

    course.tasks.push(task);
    savePromises.push(course.save())

    return task;
}

async function createSolutions(students, task, savePromises) {
    students.forEach(student => {
        savePromises.push(Solution.create({
            student,
            task,
            answers: generateAnswers(task)
        }))
    });
}

function generateTask() {
    let questions = []
    let name = "Example Task"

    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            questions.push({
                text: `Question ${i}`,
                answer: 0,
                answerType: "Test",
                choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
                points: 10
            })
        } else {
            questions.push({
                text: `Question ${i}`,
                answer: "Text",
                answerType: "Classical",
                points: 10
            })
        }
    }

    const task = {
        questions,
        name
    }

    return task;
}

function generateAnswers(task) {
    let answers = [];
    for (let i = 0; i < task.questions.length; i++) {
        const q = task.questions[i];
        let rnd = Math.random();

        if (rnd > 0.15) {
            answers.push(q.answer)
        } else if (q.answerType === 'Test') {
            answers.push(1);
        } else {
            answers.push('WRONG TEXT')
        }
    }

    return answers;
}

module.exports = route;