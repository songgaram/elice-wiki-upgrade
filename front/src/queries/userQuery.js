import { useQuery } from "react-query";
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
