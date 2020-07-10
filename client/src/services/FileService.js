import axios from "axios";

import config from "../../config/index";

export default class FileService {
    static async UploadFile(document) {
        let formData = new FormData();
        formData.append('document', document);
        const res = await axios.post(`${config.filesUrl}`, formData);
        return res.data;
    }
}