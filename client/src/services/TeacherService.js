import axios from "axios";
import store from "../store/index";

import config from "../../config/index";

export default class TeacherService {
    static async GetAllTeachers() {
        const res = await axios.get(`${config.schoolsUrl}/${store.state.school}/teachers`);
        return res.data;
    }

    static async GetTeacher(id, populate = false) {
        const res = await axios.get(`${config.teachersUrl}/${id}`, { params: { populate } });
        return res.data;
    }
}