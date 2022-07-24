import { useQuery } from "react-query";
import Api from "libs/api";

export const useGetAuthData = () => {
    return useQuery("auth", async () => {
        const res = await Api.get("auth");
        return { authData: res.data };
    });
};
