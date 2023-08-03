import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const API_URL = "http://localhost:3030/";

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    const { refreshToken } = JSON.parse(localStorage.getItem("userData") || "");

    await apiRequest
      .post(
        "/refresh-token",
        {},
        {
          headers: {
            refresh_token: refreshToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // localStorage.removeItem("userData");
        // window.location.replace("/#/sign-in");
      });
  }

  return Promise.reject(error);
};

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

export const apiRequest = setupInterceptorsTo(
  axios.create({
    baseURL: API_URL,
    timeout: 15000,
  })
);
