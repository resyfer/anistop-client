interface JSONResponse<T> {
  success: boolean;
  message?: T;
  error?: string;
}

export type { JSONResponse };
