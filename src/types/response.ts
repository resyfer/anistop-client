interface JSONResponse<T = string> {
  success: boolean;
  message?: T;
  error?: string;
}

export type { JSONResponse };
