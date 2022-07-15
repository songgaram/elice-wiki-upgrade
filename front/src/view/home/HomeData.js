import Api from "libs/api";

export const getWeekPosts = async (setPosts, week) => {
    try {
        const { data } = await Api.get(`post/week/${week}`);
        setPosts(data.payload.postListInfo);
    } catch (e) {
        console.log("Week-Post를 가져오는데 실패하였습니다.", e);
    }
};

export const getTagPosts = async (setPosts, tag) => {
    try {
        const { data } = await Api.get(`post/tag/${tag}`);
        setPosts(data.payload.postListInfo);
    } catch (e) {
        console.log("tag-Post를 가져오는데 실패하였습니다.", e);
    }
};

export const getTags = async (setTags) => {
    try {
        const { data } = await Api.get("tags");
        setTags(data.payload);
    } catch (e) {
        console.log("Tag-List를 가져오는데 실패하였습니다.", e);
    }
};

export const getGoal = async (setGoal, week) => {
    try {
        const { data } = await Api.get(`goal/week/${week}`);
        setGoal(data.payload);
    } catch (e) {
        console.log("주간 목표를 불어오는데 실패하였습니다.", e);
    }
};
