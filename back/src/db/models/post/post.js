import models, { Sequelize } from "../index";

const Op = Sequelize.Op;

class postModel {
    static getTagList(tagString) {
        // find 동작 시 post의 태그를 리스트로 변환
        const tagList = tagString.replaceAll("#", " ").trim().split(" ");
        return tagList;
    }

    static getPostInfo(element) {
        const { tag, ...postElement } = element;
        const tagList = this.getTagList(tag);
        return {
            ...postElement.dataValues,
            tag: tagList,
        };
    }

    // post 추가
    static async insertPost({ newPost }) {
        const insertPost = await models.Post.create(newPost);

        return insertPost;
    }

    static async findAllPost() {
        const posts = await models.Post.findAll({});
        if (!posts) {
            return {
                status: "failed",
                message: "게시글이 없네요..",
            };
        }
        return {
            status: "succ",
            payload: posts,
        };
    }

    static async getPostByPostId({ post_id }) {
        // postId로 post의 정보검색
        // 사용자가 post를 눌렀을 때 동작?
        const getOnePost = await models.Post.findOne({
            where: { post_id },
            attributes: ["title", "post_id", "date", "week", "user_id", "tag"],
        });
        return this.getPostInfo(getOnePost);
    }

    static async findByWeek({ week }) {
        // week를 기준으로 post 검색
        const postList = await models.Post.findAll({
            where: { week: week },
            attributes: ["title", "post_id", "date", "week", "user_id", "tag"],
        });

        const postListInfo = [];
        postList.forEach((element) => {
            postListInfo.push(this.getPostInfo(element));
        });

        return postListInfo;
    }

    static async findByTag({ tag }) {
        const posts = await models.Post.findAll({
            where: {
                tag: { [Op.substring]: tag },
            },
        });
        return posts;
    }

    static async updatePost({ postId, update }) {
        const updatePostInfo = await models.Post.update(
            {
                // 바꿀 내용
                tag: update.tag,
                week: update.week,
                title: update.title,
            },
            {
                where: {
                    post_id: postId,
                },
            }
        );
        return updatePostInfo;
    }
}

export { postModel };
