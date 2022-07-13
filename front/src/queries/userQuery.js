import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import Api from "libs/api";

// userToken으로 현재 유저상태를 받아옴
export function useGetCurrentUser() {
    return useQuery(
        "userState",
        async () => {
            const res = await Api.get("user/current");
            return { userState: res.data };
        },
        {
            retry: 1,
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            onSuccess: () => console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;"),
            onError: () => console.log("%c sessionStorage에 토큰 없음.", "color: #d93d1a;"),
        },
    );
}

// auth 정답을 post함
export const usePostAuthAnswer = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation(async (answer) => await Api.post("user/auth", answer), {
        onSuccess: (res) => {
            queryClient.invalidateQueries("userState");
            const result = res.data.payload.correct;
            if (result === false) {
                alert(res.data.payload.message);
            } else {
                alert("인증 성공!");
                navigate("/home");
            }
        },
        onError: (err) => console.log("인증 실패ㅠㅠ", err),
    });
};

export const useUserLoginHandler = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation(async (accessToken) => await Api.post("user/sign", { accessToken }), {
        onSuccess: (res) => {
            const jwtToken = res.data.payload.token;
            sessionStorage.setItem("userToken", jwtToken);
            queryClient.invalidateQueries("userState");
            navigate("/auth");
        },
        onError: (err) => console.log("로그인 실패ㅠㅠ", err),
    });
};
