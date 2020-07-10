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
        populate = qs.stringify(populate);
        const res = await axios.get(`${config.studentsUrl}/${id}`, { params: { populate } });
        return res.data;
    }

    static async EnrollStudent(studentId, courses = []) {
        const res = await axios.post(`${config.studentsUrl}/${studentId}/enroll`, { courses });
        return res.data;
    }

    static async CreateStudent(studentBody) {
        const res = await axios.post(`${config.studentsUrl}`, studentBody);
        return res.data;
    }
}