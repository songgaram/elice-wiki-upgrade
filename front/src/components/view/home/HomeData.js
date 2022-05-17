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
