import axios from "axios";
import { JSONResponse } from "../types/response";

type MethodType = "get" | "post" | "patch" | "delete";

async function getData<T = string>(
  url: string,
  method: MethodType = "get",
  data?: any,
  headers?: { [key: string]: string },
  query?: any
): Promise<JSONResponse<T>> {
  return (
    await axios({
      method,
      url,
      data,
      withCredentials: true,
      headers,
      params: query,
    })
  ).data;
}

export { getData };
