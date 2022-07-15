import { useQuery } from "react-query";
import Api from "libs/api";

export const useGetTagData = () => {
    return useQuery("tags", async () => {
        const res = await Api.get("tags");
        return { tagData: res.data };
    });
};
