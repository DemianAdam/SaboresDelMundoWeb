import axios, { AxiosError } from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data.statusCode >= 400) {
            const axiosError = new AxiosError(response.data.description,"ERR",undefined,null,response);
            axiosError.status = response.data.statusCode;
            axiosError.name = response.data.reason;
            return Promise.reject(axiosError);
        }
        
        return response;
    },
    (error) => {
        console.log(error);
        
        return Promise.reject(error);
    }
)

export default axiosInstance;