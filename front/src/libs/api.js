import axios from "axios";
import { useNavigate } from "react-router-dom";

const SERVER_PORT_NUMBER = 5001;
const SERVER_URL = `http://${window.location.hostname}:${SERVER_PORT_NUMBER}/`;

// axios 생성
const Api = axios.create({
    baseURL: SERVER_URL, // 데이터를 요청할 기본 주소
    timeout: 5000,
});

// axios request 처리
Api.interceptors.request.use(
    async (config) => {
        const userToken = sessionStorage.getItem("userToken");

        if (
            config.url === "tour/image" ||
            config.url === "community/image" ||
            config.url === "user/profileImg"
        ) {
            config.headers["Content-Type"] = "multipart/form-data";
            userToken && (config.headers["Authorization"] = `Bearer ${userToken}`);

            return config;
        }

        // config에 header 설정
        config.headers["Content-Type"] = "application/json; charset=utf-8";
        userToken && (config.headers["Authorization"] = `Bearer ${userToken}`);

        return config;
    },
    function (error) {
        // 요청에 대한 오류 발생 시, 오류 내용을 출력하고 요청을 거절함
        console.log("🚀 ~ request error : ", error);
        return Promise.reject(error);
    },
);

// axios response 처리
Api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        // 오류 처리를 위한 별도 errorController
        console.log("🚀 ~ response error : ", error);

        if (error.response.status === 401) {
            sessionStorage.removeItem("userToken");
            const navigate = useNavigate();

            return navigate("/home");
        }

        return Promise.reject(error);
    },
);

export default Api;
