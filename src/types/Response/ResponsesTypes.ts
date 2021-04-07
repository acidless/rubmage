type JSONResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

/*====================*/

export default JSONResponse;
