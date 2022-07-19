import { useQuery, useInfiniteQuery } from "react-query";
import Api from "libs/api";

export const useGetWholePostList = () => {
    return useQuery("posts", async () => {
        const res = await Api.get("posts");
        return res.data;
    });
};

export const useGetPostList = () => {
    const fetchPostList = async ({ pageParam = 1 }) => {
        const res = await Api.get(`posts?page=${pageParam}&perPage=4`);
        const { postListInfo, totalPage } = res.data.payload;
        return { postListInfo, pageParam, nextPage: pageParam + 1, totalPage };
    };

    return useInfiniteQuery("posts", fetchPostList, {
        staleTime: 50000,
        cacheTime: 120000,
        getNextPageParam: (lastPage) =>
            lastPage.totalPage === lastPage.pageParam ? undefined : lastPage.nextPage,
    });
};

export const useGetWeekPosts = (week) => {
    const fetchPostList = async ({ pageParam = 1 }) => {
        const res = await Api.get(`post/week/${week}?page=${pageParam}&perPage=4`);
        const { postListInfo, totalPage } = res.data.payload;
        return { postListInfo, pageParam, nextPage: pageParam + 1, totalPage };
    };

    return useInfiniteQuery(["posts", week], fetchPostList, {
        staleTime: 50000,
        cacheTime: 120000,
        getNextPageParam: (lastPage) =>
            lastPage.totalPage === lastPage.pageParam ? undefined : lastPage.nextPage,
    });
};

export const useGetTagPosts = (tag) => {
    const fetchPostList = async ({ pageParam = 1 }) => {
        const res = await Api.get(`post/tag/${tag}?page=${pageParam}&perPage=4`);
        const { postListInfo, totalPage } = res.data.payload;
        return { postListInfo, pageParam, nextPage: pageParam + 1, totalPage };
    };

    return useInfiniteQuery(["posts", tag], fetchPostList, {
        staleTime: 50000,
        cacheTime: 120000,
        getNextPageParam: (lastPage) =>
            lastPage.totalPage === lastPage.pageParam ? undefined : lastPage.nextPage,
    });
};
