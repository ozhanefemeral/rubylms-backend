import axios from "axios";
import store from "../store/index";
import qs from "qs";
import config from "../../config/index";

export default class StudentService {
    static async GetAllStudents() {
        const res = await axios.get(`${config.schoolsUrl}/${store.state.school}/students`);
        return res.data;
    }

    static async GetStudent(id, populate = null) {
        let populateString = qs.stringify(populate);
        const res = await axios.get(`${config.studentsUrl}/${id}`, { params: { populate: populateString } });
        return res.data;
    }
}