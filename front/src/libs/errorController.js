import { AxiosError } from "axios";

export const errorController = () => {
    const { status } = AxiosError.response || 500;

    console.log("🚀 ~ request error : ", AxiosError);

    if (status < 500) {
        console.log("🚀 ~ response error ~ status: ", status, "~ errror: ", AxiosError);
    }
    if (status >= 500) {
        console.log("🚀 ~ response error ~ status: ", status, "~ errror: ", AxiosError);
    }
    return Promise.reject(AxiosError);
};
