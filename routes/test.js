const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const faker = require('faker/locale/en_GB');
const fs = require('fs')

const School = require('../models/School');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Task = require('../models/Task');
const Course = require('../models/Course');
const Solution = require('../models/Solution');

const COURSE_NAMES = [
    "English", "German", "French",
    "Russian", "Spanish", "Chinese",
    "Turkish", "Agriculture", "Literature",
    "Sociology", "Logic", "Mathematics",
    "Psychology", "Biology", "Public Speaking",
    "Linguistics", "Geography", "Programming"
]

const STUDENT_COUNT = 10;
const TEACHER_COUNT = 10;
const TASK_COUNT = 10;

route.delete('/restart', async (req, res) => {
    let savePromises = [];

    await dropDB();
    const school = await createSchool();
    const teachers = await createTeachers(school);
    const students = await createStudents(school);
    const courses = await createCourses(school, teachers, savePromises);
    await enrollStudents(students, courses, savePromises);
    const tasks = await createTasks(courses, students, savePromises);
    await createSolutions(tasks, savePromises)

    Promise.all(savePromises)
        .then(res.send({ school, teachers, students, courses }))
})

route.get('/school/', (req, res) => {
    School.find({})
        .then(schools => res.send(schools[0]))
});

route.post('/task', async (req, res) => {
    let promises = [];
    const { course, responsibles } = req.body;

    const courseDoc = await Course.findById(course);
    const tasks = await createTasks([courseDoc], responsibles, promises);
    await createSolutions(tasks, promises);

    Promise.all(promises)
        .then(() => {
            res.send(tasks)
        })
})

async function dropDB() {
    return mongoose.connection.db.dropDatabase()
}

async function createSchool() {
    return School.create({
        name: 'Example School'
    });
}

async function createTeachers(school) {
    let teacherPromises = [];

    teacherPromises.push(
        Teacher.create({
            school,
            name: "Özhan Efe Meral",
            phone: "05375602191",
            password: "efemeral1"
        })
    )

    for (let i = 0; i < TEACHER_COUNT - 1; i++) {
        teacherPromises.push(
            Teacher.create({
                school,
                name: faker.name.findName(),
                phone: faker.phone.phoneNumber(),
                password: faker.random.word()
            })
        )
    }

    return await Promise.all(teacherPromises);
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

async function createCourses(school, teachers, savePromises) {
    let coursePromises = [];

    for (let i = 0; i < TEACHER_COUNT; i++) {
        const rnd = Math.floor(Math.random() * COURSE_NAMES.length);
        coursePromises.push(Course.create({
            school,
            teachers: [teachers[i]],
            name: COURSE_NAMES[rnd]
        }))
    }

    const courses = await Promise.all(coursePromises);

    for (let i = 0; i < courses.length; i++) {
        teachers[i].courses.push(courses[i]);
        savePromises.push(teachers[i].save());
    }

    return courses;
}

async function enrollStudents(students, courses, savePromises) {
    students.forEach(s => {
        s.courses.push(...courses);
        savePromises.push(s.save())
    });

    courses.forEach(c => {
        c.students = students;
        savePromises.push(c.save())
    });

    await Promise.all(savePromises);
}

async function createTasks(courses, students, savePromises) {
    let allTasks = [];

    for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        let taskPromises = [];

        for (let j = 0; j < TASK_COUNT; j++) {
            const taskBody = generateTask();
            taskPromises.push(Task.create({
                ...taskBody,
                course,
                responsibles: students
            }))
        }

        const tasks = await Promise.all(taskPromises)


        allTasks.push(...tasks);
        course.tasks.push(...tasks);
        savePromises.push(course.save());
    }

    return allTasks;
}

async function createSolutions(tasks, savePromises) {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        task.responsibles.forEach(student => {
            savePromises.push(
                Solution.create({
                    student,
                    task,
                    duration: Math.floor(300 + (Math.random() * 10) * 30),
                    answers: generateAnswers(tasks[i])
                })
            )
        })
    }
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
        name,
        chances: 2
    }

    return task;
}

function generateAnswers(task) {
    let answers = [];
    for (let i = 0; i < task.questions.length; i++) {
        const q = task.questions[i];
        let rnd = Math.random();

        if (rnd > 0.15) {
            console.log(q.answer);
            answers.push({ value: q.answer })
        } else if (q.answerType === 'Test') {
            answers.push({ value: 1 });
        } else {
            answers.push({ value: 'WRONG TEXT' })
        }
    }

    return answers;
}

module.exports = route;