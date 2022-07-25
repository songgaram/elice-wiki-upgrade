import { useQuery, useMutation, useQueryClient } from "react-query";
import Api from "libs/api";

export const useGetBoardList = (page, perPage) => {
    return useQuery(
        ["boards", page],
        async () => {
            const res = await Api.get(`boardlist/pageinfo?page=${page}&perPage=${perPage}`);
            return res.data;
        },
        { keepPreviousData: true },
    );
};

export const useGetBoardData = (id) => {
    return useQuery(["board", id], async () => {
        const res = await Api.get(`boards/${id}`);
        return { boardData: res.data };
    });
};

export const useUpdateBoard = (id) => {
    const queryClient = useQueryClient();
    return useMutation(async (board) => await Api.put(`boards/${id}`, board), {
        onSuccess: () => {
            queryClient.invalidateQueries("board");
        },
        onError: (err) => console.log("게시글 수정 실패ㅠㅠ", err),
    });
};

export const usePostBoard = () => {
    const queryClient = useQueryClient();
    return useMutation(async (board) => await Api.post("boards/board", board), {
        onSuccess: () => {
            queryClient.invalidateQueries("boards");
        },
        onError: (err) => console.log("게시글 생성 실패ㅠㅠ", err),
    });
};

export const useDeleteBoard = (id) => {
    const queryClient = useQueryClient();
    return useMutation(async () => await Api.delete(`boards/${id}`), {
        onSuccess: () => {
            queryClient.invalidateQueries("boards");
        },
        onError: (err) => console.log("게시글 삭제 실패ㅠㅠ", err),
    });
};

export const useDeleteAdminBoard = () => {
    const queryClient = useQueryClient();
    return useMutation(async (id) => await Api.delete(`boardlist/${id}`), {
        onSuccess: () => {
            queryClient.invalidateQueries("boards");
        },
        onError: (err) => console.log("게시글 삭제 실패ㅠㅠ", err),
    });
};
