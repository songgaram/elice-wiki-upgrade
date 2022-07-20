import { useQuery } from "react-query";
import Api from "libs/api";

export const useGetCommentList = (id) => {
    return useQuery(["comments", id], async () => {
        const res = await Api.get(`commentlist/board/${id}`);
        return res.data;
    });
};
