import { useQuery } from "react-query";
import Api from "libs/api";

export const useGetGoalData = (week) => {
    return useQuery(
        ["goal", week],
        async () => {
            const res = await Api.get(`goal/week/${week}`);
            return { goalData: res.data };
        },
        { retry: 0 },
    );
};
