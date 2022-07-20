import { useQuery } from "react-query";
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
