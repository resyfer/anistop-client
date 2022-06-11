import axios from "axios";
import { JSONResponse } from "../types/response";

type MethodType = "get" | "post" | "patch" | "delete";

async function getData<T = string>(
  url: string,
  method: MethodType = "get",
  data?: any,
  headers?: { [key: string]: string }
): Promise<JSONResponse<T>> {
  return (
    await axios({
      method,
      url,
      data,
      withCredentials: true,
      headers,
    })
  ).data;
}

export { getData };
