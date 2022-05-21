import * as Api from "../../../api";

export const getPosts = async (setPosts) => {
    try {
        const { data } = await Api.get("posts");
        setPosts(data.payload);
    } catch (e) {
        console.log("Post-List를 가져오는데 실패하였습니다.", e);
    }
};

export const handleWeekClick = async (setPosts, week) => {
    try {
        const { data } = await Api.get(`post/week/${week}`);
        setPosts(data.payload);
    } catch (e) {
        console.log("Week-Post를 가져오는데 실패하였습니다.", e);
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
