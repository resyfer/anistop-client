import axios from "axios";

type MethodType = "get" | "post" | "patch" | "delete";

function getData(url: string, data: any, method: MethodType = "get") {
  return axios({
    method,
    url,
    data,
    withCredentials: true,
  });
}

export { getData };
