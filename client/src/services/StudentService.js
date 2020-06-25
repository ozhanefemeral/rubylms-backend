import axios from "axios";
import store from "../store/index";

import config from "../../config/index";

export default class StudentService {
    static async GetAllStudents() {
        const res = await axios.get(`${config.schoolsUrl}/${store.state.school}/students`);
        return res.data;
    }
}