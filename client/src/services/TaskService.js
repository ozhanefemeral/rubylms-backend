import axios from "axios";
import qs from "qs";

import config from "../../config/index";

export default class TaskService {
    static async CreateTask(task) {
        const res = await axios.post(`${config.tasksUrl}`, { task });
        return res.data;
    }

    static async GetTask(id, populate = undefined) {
        populate = qs.stringify(populate)
        const res = await axios.get(`${config.tasksUrl}/${id}`, { params: { populate } });
        return res.data;
    }

    static async FindSolutions(studentId, select = undefined, populate = undefined) {
        populate = qs.stringify(populate);
        // select = qs.stringify(select);
        const res = await axios.get(`${config.studentsUrl}/${studentId}/solutions`, { params: { select, populate } })
        return res.data;
    }

<<<<<<< HEAD
    static async UpdateSolution(id, solutionBody) {
        const res = await axios.patch(`${config.solutionsUrl}/${id}`, { solutionBody });
        return res.data;
    }

    static async UpdateTask(id, solutionBody) {
        const res = await axios.patch(`${config.solutionsUrl}/${id}`, { solutionBody });
=======
    static async UpdateSolution(id, solution) {
        const res = await axios.patch(`${config.solutionsUrl}/${id}`, { solution });
>>>>>>> c7d0be25c2fc3a553fe4880b76c326fd5046fa95
        return res.data;
    }
}