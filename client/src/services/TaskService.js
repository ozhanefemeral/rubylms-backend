import axios from "axios";

import config from "../../config/index";

export default class TaskService {
    static async CreateTask(task, document) {
        let formData = new FormData();
        formData.set('task', JSON.stringify(task));
        formData.append('document', document);

        const res = await axios.post(`${config.tasksUrl}`, formData);
        return res.data;
    }
}