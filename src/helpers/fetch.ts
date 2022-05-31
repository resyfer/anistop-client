import axios from "axios";
import { JSONResponse } from "../types/response";

type MethodType = "get" | "post" | "patch" | "delete";

async function getData<T = string>(
  url: string,
  data: any,
  method: MethodType = "get"
): Promise<JSONResponse<T>> {
  return (
    await axios({
      method,
      url,
      data,
      withCredentials: true,
    })
  ).data;
}

export { getData };
