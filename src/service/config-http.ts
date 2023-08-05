import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:3030/";

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401) {
  }

  return Promise.reject(error);
};

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(
    async (request) => {
      if (request.headers.Authorization) {
        const userData = JSON.parse(localStorage.getItem("userData") || "");
        const user: any = jwtDecode(userData.accessToken);
        const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;
        if (!isExpired) return request;

        const response = await apiRequest
          .post(
            "/refresh-token",
            {},
            {
              headers: {
                refresh_token: userData.refreshToken,
              },
            }
          )
          .catch((error: any) => {
            localStorage.removeItem("userData");
            window.location.replace("/#/sign-in");
          });

        localStorage.setItem("userData", {
          ...userData,
          accessToken: response?.data.token,
        });
        request.headers.Authorization = `Bearer ${response?.data.token}`;
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

export const apiRequest = setupInterceptorsTo(
  axios.create({
    baseURL: API_URL,
    timeout: 15000,
  })
);
