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
            staleTime: Infinity,
            onError: () => console.log("%c sessionStorage에 토큰 없음.", "color: #d93d1a;"),
        },
    );
}

// auth 정답을 post함
export const usePostAuthAnswer = () => {
    const queryClient = useQueryClient();

    return useMutation(async (answer) => await Api.post("user/auth", answer), {
        onSuccess: () => {
            queryClient.invalidateQueries("userState");
        },
        onError: (err) => console.log("인증 실패ㅠㅠ", err),
    });
};
