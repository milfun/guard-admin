import axios from 'axios';

function axiosUpload(options) {
  const {name, file} = options;
  const form = new FormData();
  form.append(name, file);
  options.headers = {
    'Content-Type': 'multipart/form-data',
    ...(options.headers || {}),
  };
  options.method = 'post';
  options.timeout = 20000;
  options.data = form;
  return axios(options);
}

/**
 * 图片上传接口
 * @param data
 * @param onProgress 上传进度 0~100 成功后变0
 * @returns {Promise<any>}
 */
function imageUpload({data, onProgress, url, name}) {
  return new Promise((resolve, reject) => {
    if (data.file.type.indexOf('image') === 0) {
      let percent = 0;
      axiosUpload({
        url,
        name,
        onUploadProgress: ProgressEvent => {
          if (ProgressEvent.lengthComputable) {
            percent = ProgressEvent.loaded / ProgressEvent.total * 100;
          }
          if (percent === 100) {
            percent = 0;
          }
          onProgress && onProgress(percent);
        },
        file: data.file,
      }).then(res => {
       	resolve(res.data);
      }).catch(err => {
        onProgress && onProgress(0);
        reject(err);
      });
    } else {
      reject('not image file');
    }
  });
}


export default imageUpload;
