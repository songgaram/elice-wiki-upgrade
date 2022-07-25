import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import Api from "libs/api";

export const useGetUserList = (page, perPage) => {
    return useQuery(["users", page], async () => {
        const res = await Api.get(`users?page=${page}&perPage=${perPage}`);
        const userListInfo = res.data.payload.rows
        const totalPage = res.data.payload.count
        return { userListInfo, totalPage }
    });
};

// userToken으로 현재 유저상태를 받아옴
export const useGetCurrentUser = () => {
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

// 유저 로그인
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

// 유저 탈퇴
export const useDeleteUserHandler = () => {
    const navigate = useNavigate();

    return useMutation(async () => await Api.delete("user/current"), {
        onSuccess: () => {
            sessionStorage.removeItem("userToken");
            alert("탈퇴가 완료되었습니다.");
            navigate("/");
        },
        onError: (err) => console.log("탈퇴 실패ㅠㅠ", err),
    });
};

// 유저 이름 수정
export const useEditUserInfo = () => {
    const queryClient = useQueryClient();

    return useMutation(async (name) => await Api.put("user/current", { name }), {
        onSuccess: () => {
            queryClient.invalidateQueries("userState");
        },
        onError: (err) => console.log("수정 실패ㅠㅠ", err),
    });
};

// 유저 정보 수정
export const useEditUsers = () => {
    const queryClient = useQueryClient();

    return useMutation(async ({ userId, data }) => {
        await Api.put(`users/${userId}`, data)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("users");
        },
        onError: (err) => console.log("수정 실패ㅠㅠ", err),
    });
};

// 유저 관리
export const useDeleteUsers = () => {
    const queryClient = useQueryClient();

    return useMutation(async (userId) => await Api.delete(`users/${userId}`), {
        onSuccess: () => {
            queryClient.invalidateQueries("users");
        },
        onError: (err) => console.log("삭제 실패", err),
    })
}
