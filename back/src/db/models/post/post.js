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

// post model class
class postModel {
    // post 추가
    static async insertPost({ newPost }) {
        const insertPost = await models.Post.create(newPost);
        return insertPost;
    }

    static async findAllPost({ page, perPage }) {
        const { totalPage, rows } = await postPagination({
            page,
            perPage,
        });
        const postListInfo = getPostList(rows);
        return { totalPage, postListInfo };
    }

    static async getPostByPostId({ post_id }) {
        const getOnePost = await models.Post.findOne({
            where: { post_id },
        });
        return getOnePost;
    }

    static async findByWeek({ week, page, perPage }) {
        let rows;
        let postListInfo;

        if (!page) {
            console.log(week);
            rows = await models.Post.findAll({ where: { week: week } });
            postListInfo = getPostInfo(rows);
            console.log(rows);
            return { totalPage: null, postListInfo };
        }
        if (page) {
            const query = {
                week: week,
            };
            // week를 기준으로 post 검색
            let { totalPage, rows } = await postPagination({
                page,
                perPage,
                query,
            });
            postListInfo = getPostList(rows);
            return { totalPage, postListInfo };
        }
    }

    static async findByTag({ tag, page, perPage }) {
        const query = {
            tag: { [Op.substring]: tag },
        };
        const { totalPage, rows } = await postPagination({
            page,
            perPage,
            query,
        });
        const postListInfo = getPostList(rows);
        return { totalPage, postListInfo };
    }

    static async updatePost({ postId, update }) {
        const updateValue = { ...update };
        const updatePostInfo = await models.Post.update(updateValue, {
            where: {
                post_id: postId,
            },
        });
        return updatePostInfo;
    }
    static async deletePost({ postId }) {
        const deleteResult = await models.Post.destroy({
            where: { post_id: postId },
        });
        return deleteResult;
    }
}

export { postModel };
