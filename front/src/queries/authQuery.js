import { useQuery, useMutation, useQueryClient } from "react-query";
import Api from "libs/api";

export const useGetAuthData = (page, perPage) => {
    return useQuery(["auths", page], async () => {
        const res = await Api.get(`auths?perPage=${perPage}&page=${page}`);
        return res.data;
    });
};

export const useGetAuthQuestion = () => {
    return useQuery(["question"], async () => {
        const res = await Api.get("auth");
        return res.data;
    });
};

// auth image upload
export const usePostAuthImage = () => {
    return useMutation(async (formdata) => await Api.post("authimage", formdata)
        , {
            onError: (err) => console.log("업로드 실패ㅠㅠ", err),
        });
};

// auth question save
export const usePostAuthQuestion = () => {
    const queryClient = useQueryClient();
    return useMutation(async (data) => await Api.post("auth", data)
        , {
            onSuccess: () => { queryClient.invalidateQueries("auths"); },
            onError: (err) => console.log("갱신 실패ㅠㅠ", err),
        });
};

// auth question update
export const usePutAuthQuestion = () => {
    const queryClient = useQueryClient();
    return useMutation(async (id, data) => await Api.put(`auth/${id}`, data)
        , {
            onSuccess: () => {
                queryClient.invalidateQueries("auths");
            },
            onError: (err) => console.log("갱신 실패ㅠㅠ", err),
        });
};

// delete auth question
export const useDelAuthQuestion = () => {
    const queryClient = useQueryClient();
    return useMutation(async (id) => await Api.delete(`auth/${id}`)
        , {
            onSuccess: () => {
                queryClient.invalidateQueries("auths");
            },
            onError: (err) => console.log("갱신 실패ㅠㅠ", err),
        });
};