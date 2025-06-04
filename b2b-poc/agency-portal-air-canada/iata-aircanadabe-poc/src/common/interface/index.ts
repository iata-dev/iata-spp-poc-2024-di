export interface PostApiCallOptions {
  headers?: Record<string, string>;
}

export interface GetApiCallOptions {
  headers?: Record<string, string>; // Custom headers for the GET request
  params?: Record<string, string | number | boolean>; // Optional query parameters
  timeout?: number; // Optional timeout for the request
}
