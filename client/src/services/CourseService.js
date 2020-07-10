import axios from "axios";
import store from "../store/index";
import qs from 'qs';
import config from "../../config/index";

export default class CourseService {
    static async GetAllCourses(select = null, populate = null) {
        populate = qs.stringify(populate);
        select = qs.stringify(select);
        const res = await axios.get(`${config.schoolsUrl}/${store.state.school}/courses`, { params: { populate, select } });
        return res.data;
    }

    static async GetCourse(id, populate = null) {
        populate = qs.stringify(populate);
        const res = await axios.get(`${config.coursesUrl}/${id}`, { params: { populate } });
        return res.data;
    }

    static async CreateCourse(courseBody) {
        const res = await axios.post(`${config.coursesUrl}/`, courseBody);
        return res.data;
    }
}