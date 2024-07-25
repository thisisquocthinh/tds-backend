import cassoReqInstance from "../config/cassoReqInstance.js";
import reqInstance from "../config/reqInstance.js";

class ApiServices {
  constructor(useCasso = false) {
    this.service = useCasso ? cassoReqInstance : reqInstance;
  }

  handleErrorResponse = (err) => {
    let message = "Something when wrong!";
    if (err && err.response) {
      const data = err.response.data;
      if (
        data.status === 400 ||
        data.status === 409 ||
        data.status === 404 ||
        data.status === 401
      ) {
        message = data.message;
      } else {
        message = err.message;
      }
    }
    return message;
  };

  get = async (path) => {
    return this.service
      .get(path)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        let message = "";
        message = this.handleErrorResponse(err);
        const error = new Error(message);
        console.log(error);
        return Promise.reject(error);
      });
  };

  async post(path, payload) {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        let message = "";
        message = this.handleErrorResponse(err);
        const error = new Error(message);
        return Promise.reject(error);
      });
  }

  async put(path, payload) {
    return this.service
      .request({
        method: "PUT",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        let message = "";
        message = this.handleErrorResponse(err);
        const error = new Error(message);
        return Promise.reject(error);
      });
  }

  async delete(path, payload) {
    return this.service
      .request({
        method: "DELETE",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        let message = "";
        message = this.handleErrorResponse(err);
        const error = new Error(message);
        return Promise.reject(error);
      });
  }
}

const ApiService = new ApiServices();
const ApiServiceCasso = new ApiServices(true);

export { ApiService, ApiServiceCasso };

export default ApiService;
