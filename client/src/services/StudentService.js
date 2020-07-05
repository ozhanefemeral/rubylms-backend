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
        let url = new URL(`https://ruby-lms.herokuapp.com/api/students/${id}`);
        // let url = new URL(`http://localhost:3000/api/students/${id}`);
        url.searchParams.append('populate', populate);

        fetch(url, {
            headers: new Headers({
                'Authorization': 'Bearer ' + store.state.token
            })
        }).then(res => {
            console.log(res);
            return res.json()
        }).then(data => {
            console.log(data);
        })
        // console.log(json);

        // return json;
        // const res = await axios.get(`${config.studentsUrl}/${id}`, { params: { populate } });
        // return res.data;
    }
}