import { useQuery, useMutation, useQueryClient } from "react-query";
import Api from "libs/api";

export const useGetBoardData = (id) => {
    return useQuery(["board", id], async () => {
        const res = await Api.get(`boards/${id}`);
        return { boardData: res.data };
    });
};

export const useGetCommentList = (id) => {
    return useQuery(["comments", id], async () => {
        const res = await Api.get(`commentlist/board/${id}`);
        return res.data;
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
