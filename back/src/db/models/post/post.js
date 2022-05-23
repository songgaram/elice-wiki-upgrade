import models, { Sequelize } from "../index";

const Op = Sequelize.Op;

const getTagList = (tagString) => {
    // find 동작 시 post의 태그를 리스트로 변환
    const tagList = tagString.replaceAll("#", " ").trim().split(" ");
    return tagList;
};

const getPostInfo = (element) => {
    const { tag, ...postElement } = element;
    const tagList = getTagList(tag);
    return {
        ...postElement.dataValues,
        tag: tagList,
    };
};

const getPostList = (posts) => {
    const postListInfo = [];
    posts.forEach((element) => {
        postListInfo.push(getPostInfo(element));
    });
    return postListInfo;
};

// page 계산
const paginate = async ({ aggregator, currentPage, perPage }) => {
    const total = await aggregator();
    console.log(`total: ${total}`);

    let totalPage = Math.ceil(total / perPage);
    if (currentPage > totalPage) {
        currentPage = totalPage;
    }
    return { currPage: currentPage, totalPage };
};

const postPagination = async ({ page, perPage, query = null }) => {
    const paginateQuery = {
        where: query,
        order: [["createdAt", "DESC"]],
        limit: perPage,
        offset: perPage * (page - 1),
    };
    const { count, rows } = await models.Post.findAndCountAll(paginateQuery);
    const totalPage = Math.ceil(count / perPage);

    return { totalPage, rows };
};

class postModel {
    // post 추가
    static async insertPost({ newPost }) {
        try {
            const insertPost = await models.Post.create(newPost);
            return {
                status: "succ",
                payload: insertPost,
            };
        } catch (error) {
            return {
                status: "failed",
                message: "게시글을 저장할 수 없습니다.",
            };
        }
    }

    static async findAllPost({ page, perPage }) {
        try {
            const { totalPage, rows } = await postPagination({
                page,
                perPage,
            });
            const postListInfo = getPostList(rows);

            return {
                status: "succ",
                payload: { totalPage, postListInfo },
            };
        } catch (error) {
            return {
                status: "failed",
                message: "게시글이 없네요..",
            };
        }
    }

    static async getPostByPostId({ post_id }) {
        try {
            const getOnePost = await models.Post.findOne({
                where: { post_id },
            });
            return {
                status: "succ",
                payload: getOnePost,
            };
        } catch (error) {
            return {
                status: "failed",
                message: "조건에 알맞은 게시글이 없습니다",
            };
        }
    }

    static async findByWeek({ week, page, perPage }) {
        try {
            const query = {
                week: week,
            };
            // week를 기준으로 post 검색
            const { totalPage, rows } = await postPagination({
                page,
                perPage,
                query,
            });
            const postListInfo = getPostList(rows);
            return {
                status: "succ",
                payload: { totalPage, postListInfo },
            };
        } catch (error) {
            return {
                status: "failed",
                message: "조건에 알맞은 게시글이 없습니다",
            };
        }
    }

    static async findByTag({ tag, page, perPage }) {
        try {
            const query = {
                tag: { [Op.substring]: tag },
            };
            const { totalPage, rows } = await postPagination({
                page,
                perPage,
                query,
            });
            const postListInfo = getPostList(rows);

            return {
                status: "succ",
                payload: { totalPage, postListInfo },
            };
        } catch (error) {
            return {
                status: "failed",
                message: "조건에 알맞은 게시글이 없습니다",
            };
        }
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
        if (!updatePostInfo) {
            return {
                status: "failed",
                message: "조건에 알맞은 게시글이 없습니다",
            };
        }
        return {
            status: "succ",
            payload: updatePostInfo,
        };
    }
    static async deletePost({ postId }) {
        const deleteResult = await models.Post.destroy({ where: { post_id: postId } });
        return deleteResult;
    }
}

export { postModel };
