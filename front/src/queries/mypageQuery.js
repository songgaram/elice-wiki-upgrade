import { useQuery } from "react-query";
import Api from "libs/api";

export const useGetMyPosts = () => {
    return useQuery(
        ["posts"],
        async () => {
            const res = await Api.get("post/userid");
            return res.data
        }
    );
};

export const useGetMyComments = (userId) => {
    return useQuery(
        ["comments", userId],
        async () => {
            const { data } = await Api.get(`commentlist/user/${userId}`);
            return data.payload

        }
    );
};

export const useGetMyBoards = (userId) => {
    return useQuery(
        ["boards", userId],
        async () => {
            const { data } = await Api.get(`boardlist/user/${userId}`);
            return data.payload

        }
    );
};