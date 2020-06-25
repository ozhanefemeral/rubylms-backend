import axios from "axios";
import store from "../store/index";

import config from "../../config/index";

export default class CourseService {
    static async GetAllCourses() {
        const res = await axios.get(`${config.schoolsUrl}/${store.state.school}/courses`);
        return res.data;
    }
}