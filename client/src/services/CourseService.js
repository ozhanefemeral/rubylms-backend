import axios from "axios";
import store from "../store/index";
import qs from 'qs';
import config from "../../config/index";

export default class CourseService {
    static async GetAllCourses() {
        const res = await axios.get(`${config.schoolsUrl}/${store.state.school}/courses`);
        return res.data;
    }

    static async GetCourse(id, populate = null) {
        const populateString = qs.stringify(populate);
        const res = await axios.get(`${config.coursesUrl}/${id}`, { params: { populate: populateString } });
        return res.data;
    }

    static async CreateCourse(courseBody) {
        const res = await axios.post(`${config.coursesUrl}/`, courseBody);
        return res.data;
    }
}