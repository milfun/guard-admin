import setting from "@/settings.js";
import axios from "axios";
import { getToken } from "@/utils/auth";

function upload({ url, file, header = {}, errorModal = true } = {}) {
  return new Promise((resolve, reject) => {
    header = {
      "content-type": "multipart/form-data",
      Authorization: "Bearer " + getToken(),
      ...header,
    };
    axios({
      method: "POST",
      url: setting.imageUpload,
      data: file,
      headers: header,
    })
      .then((res) => {
        resolve({ code: 200, data: res.data, msg: "" });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export { upload };
