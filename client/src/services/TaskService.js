import axios from "axios";
import qs from "qs";

import config from "../../config/index";

export default class TaskService {
    static async CreateTask(task, document) {
        let formData = new FormData();
        formData.set('task', JSON.stringify(task));
        formData.append('document', document);

        const res = await axios.post(`${config.tasksUrl}`, formData);
        return res.data;
    }

    static async GetTask(id, populate = undefined) {
        populate = qs.stringify(populate)
        const res = await axios.get(`${config.tasksUrl}/${id}`, { params: populate });
        return res.data;
    }
}