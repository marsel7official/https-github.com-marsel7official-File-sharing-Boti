export type ApiError = {
  code?: string;
  message: string;
  values: { [key: string]: string };
};

export type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
};
