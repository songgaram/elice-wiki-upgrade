import { useQuery, useMutation, useQueryClient } from "react-query";
import Api from "libs/api";

export const useGetCommentList = (boardId) => {
    return useQuery(["comments", boardId], async () => {
        const res = await Api.get(`commentlist/board/${boardId}`);
        return res.data;
    });
};

export const useUpdateComment = (id) => {
    const queryClient = useQueryClient();
    return useMutation(async (comment) => await Api.put(`comments/${id}`, comment), {
        onSuccess: () => {
            queryClient.invalidateQueries("comments");
        },
        onError: (err) => console.log("댓글 수정 실패ㅠㅠ", err),
    });
};

export const usePostComment = () => {
    const queryClient = useQueryClient();
    return useMutation(async (comment) => await Api.post("comments/comment", comment), {
        onSuccess: () => {
            queryClient.invalidateQueries("comments");
        },
        onError: (err) => console.log("댓글 생성 실패ㅠㅠ", err),
    });
};

export const useDeletecomment = (id) => {
    const queryClient = useQueryClient();
    return useMutation(async () => await Api.delete(`comments/${id}`), {
        onSuccess: () => {
            queryClient.invalidateQueries("comments");
        },
        onError: (err) => console.log("댓글 삭제 실패ㅠㅠ", err),
    });
};
