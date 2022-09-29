import { postService } from "../services/postService";
import { tagService } from "../services/tagService";
import { userService } from "../services/userService";
import fs from 'fs';

class postController {
    static async insert(req, res, next) {
        const posts = fs.readFileSync('src/data/posts.json', 'utf8');
        const array = JSON.parse(posts);
        array.forEach(async (post) =>
            await postService.insertData({ title: post.title || "", tag: post.tag || "", post_id: post.post_id || "", user_id: post.user_id || "", date: post.date || "", week: post.week || "", lastmod_user: post.lastmod_user || "" })
        );
        res.status(200).send("success")
    }
    static async addPost(req, res, next) {
        try {
            // 요청으로부터 데이터 받아오기
            const user_id = req.currentUser.userId;
            const {
                week,
                tag,
                title,
                body = "# title\n\n## h2\n\n- p tag   \n\n- p tag   \n\ncontent\n# hello",
            } = req.body;
            const getUser = await userService.findUser({
                userId: user_id,
            });
            const lastmod_user = getUser.name;

            const create = await postService.addPost({
                user_id,
                week,
                tag,
                body,
                lastmod_user,
                title,
            });
            res.status(201).json({
                status: "success",
                payload: { postId: create.post_id },
            });
        } catch (error) {
            next(error);
        }
    }

    static async getPostByPostId(req, res, next) {
        try {
            const post_id = req.params.id;
            const getSinglePost = await postService.getPostByPostId({
                post_id,
            });
            res.status(200).json({ status: "success", payload: getSinglePost });
        } catch (error) {
            next(error);
        }
    }

    static async getPostByWeek(req, res, next) {
        try {
            const week = req.params.week;
            const { page = 1, perPage = -1 } = req.query;
            const postList = await postService.getPostByWeek({
                week: Number(week),
                page: Number(page),
                perPage: Number(perPage),
            });
            res.status(200).json({ status: "success", payload: postList });
        } catch (error) {
            next(error);
        }
    }

    static async getPostsByTag(req, res, next) {
        try {
            const tag = req.params.tag;
            const { page = 1, perPage = -1 } = req.query;
            const posts = await postService.getPostsByTag({
                tag,
                page: Number(page),
                perPage: Number(perPage),
            });
            res.status(200).json({ status: "success", payload: posts });
        } catch (error) {
            next(error);
        }
    }

    static async updatePost(req, res, next) {
        try {
            const postId = req.params.id;
            const userId = req.currentUser.userId;
            await tagService.deleteTag(postId);
            const getUser = await userService.findUser({
                userId,
            });
            const lastmod_user = getUser.name;

            const {
                week,
                tag,
                title,
                body = "# hello world\n\n## h2\n\n- p tag   \n\n- p tag   \n\ncontent\n# hello",
            } = req.body;
            await postService.updatePost({
                body,
                user_id: userId,
                lastmod_user,
                postId,
                week,
                title,
                tag,
            });
            res.status(200).json({ status: "success" });
        } catch (error) {
            next(error);
        }
    }

    static async findAllPost(req, res, next) {
        try {
            const { page = 1, perPage = 10 } = req.query;
            const posts = await postService.getAllPost({
                page: Number(page),
                perPage: Number(perPage),
            });
            res.status(200).json({ status: "success", payload: posts });
        } catch (error) {
            next(error);
        }
    }

    static async deletePost(req, res, next) {
        const postIdList = req.params.postId.split(",");
        const deleteResult = { success: 0, failed: 0 };
        Promise.all(
            postIdList.map(async (id) => {

                try {
                    const result = await postService.deletePost({ postId: id });
                    await tagService.deleteTag(id);
                    if (result === 0) {
                        deleteResult.failed += 1;
                    } else {
                        deleteResult.success += 1;
                    }
                } catch (error) {
                    next(error);
                }
            })
        ).then(() => {
            const body = {
                status: "success",
                payload: { ...deleteResult },
            };
            res.status(200).json(body);
        });
    }

    static async findByUserId(req, res, next) {
        try {
            const user_id = req.currentUser.userId;
            const { page = 1, perPage = 10 } = req.query;
            const posts = await postService.findByUserId({
                page: Number(page),
                perPage: Number(perPage),
                user_id,
            });
            res.status(200).json({ status: "success", payload: posts });
        } catch (error) {
            next(error);
        }
    }
}

export { postController };
