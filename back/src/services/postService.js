import { postModel } from "../db/models/post/post";
import { tagModel } from "../db/models/tag/index";

import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const writePost = (date, postId, body) => {
    // post  추가 시 content를 파일로 만들어 폴더에 저장
    const savePath_post = "../../../front/src/_post";
    const savePath = `${__dirname}`;
    // postId는 라우팅 경로로 사용될 수 있으므로 shortId로 만드는 것도 괜찮을 듯

    // front/src/_post에 md파일이 저장된다
    fs.writeFile(
        `${savePath}/${savePath_post}/${date}-${postId}.md`,
        "\ufeff" + body,
        {
            encoding: "utf-8",
        },
        (err, data) => {
            if (err) {
                console.log(err);
            }
        }
    );
};

const getNowDateToString = () => {
    // 현재 시간을 받아오기
    // fixme: 날짜를 그냥 시간 빼고 문자열로 저장 하는것 생각해보기

    const nowDate = new Date();
    const year = nowDate.getUTCFullYear();

    // 월과 일은 2자리가 아닌경우 앞에 0을 붙여줌
    const month =
        nowDate.getUTCMonth().toString().length !== 2
            ? `0${nowDate.getUTCMonth()}`
            : nowDate.getUTCMonth();

    const day =
        nowDate.getUTCDate().toString().length !== 2
            ? `0${nowDate.getUTCDate()}`
            : nowDate.getUTCDate();

    const date = `${year}-${month}-${day}`;

    const dateDot = `${year}.${month}.${day}`;
    return { date, dateDot };
};

const makeTag = ({ tagList, post_id }) => {
    // tag 테이블에 추가하기
    let storedTag = "";

    tagList.forEach(async (tag) => {
        storedTag += `#${tag}`;
        const getTagId = await tagModel.getTagId({ tag });
        let tag_id = "";
        if (getTagId === null) {
            // tag가 존재하지 않으면 추가
            tag_id = uuidv4();
        } else {
            tag_id = getTagId.tag_id;
        }
        const newPostTag = { tag_id, tag, post_id };
        const insertPostIdInTag = await tagModel.insertPostId({
            newPostTag,
        });
    });

    return storedTag;
};

class postService {
    // 값 req에서 받아와 추가 하기
    // tag 여러개 가져오는 방법은 프론트와 함께 얘기해봐야 함 #tag 이런식??
    static async addPost({ user_id, week, tag, title, body }) {
        // body에서 받은 text를 md파일로 저장
        // todo: 함수 다이어트 필요

        const { date, dateDot } = getNowDateToString();
        const post_id = uuidv4();
        writePost(date, post_id, body);

        // tag 테이블에 추가하기
        const storedTag = makeTag({ tagList: tag, post_id });

        const newPost = {
            post_id,
            user_id,
            date: dateDot,
            week,
            tag: storedTag,
            title,
        };
        const insertedPost = await postModel
            .insertPost({ newPost })
            .then(() => console.log("post created"))
            .catch((err) => console.log(err));

        return insertedPost;
    }

    static async getPostByPostId({ post_id }) {
        // post_id를 기준으로 검색
        const getOnePost = await postModel.getPostByPostId({ post_id });
        return getOnePost;
    }

    static async getPostByWeek({ week }) {
        // week 기준으로 post 검색
        const getPosts = await postModel.findByWeek({ week });
        return getPosts;
    }

    static async getPostsByTag({ tag }) {
        const posts = await postModel.findByTag({ tag });
        return posts;
    }

    static async updatePost({ week, tag, title, postId }) {
        // todo: body는 이후에 수정
        const getTag = makeTag({ tagList: tag, post_id: postId });
        const update = {
            postId,
            week,
            tag: getTag,
            title,
        };
        const updatePost = await postModel.updatePost({ postId, update });
        return { updatePost, message: "게시글의 정보가 수정되었습니다." };
    }
}

export { postService };
