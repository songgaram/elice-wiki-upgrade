import { postService } from "../services/postService";

class postController {
    static async addPost(req, res, next) {
        try {
            // 요청으로부터 데이터 받아오기
            const { user_id, week, tag, title, lastmod_user } = req.body;
            // tag는 리스트로 들어옵니다

            // body에 text가 저장되어 올 것
            // TODO: 텍스트를 어떻게 받아와야 잘 저장이 될지 고민..
            // 아래 방법으로는 md파일에 저장해도 제대로 보여주지 못함
            // front에서 바로 md파일을 만들 수 있는지 찾아보기, 백에서도 동일하게
            const body =
                "# title\n\n## h2\n\n- p tag   \n\n- p tag   \n\ncontent\n# hello";

            const newPost = await postService.addPost({
                user_id,
                week,
                tag,
                body,
                lastmod_user,
                title,
            });
            res.status(201).json(newPost);
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getPostByPostId(req, res, next) {
        const post_id = req.params.id;
        const getSinglePost = await postService.getPostByPostId({ post_id });
        res.status(200).json(getSinglePost);
    }

    static async getPostByWeek(req, res, next) {
        const week = req.params.week;
        const { page, perPage } = req.query;
        const postList = await postService.getPostByWeek({
            week,
            page: Number(page),
            perPage: Number(perPage),
        });
        res.status(200).json(postList);
    }

    static async getPostsByTag(req, res, next) {
        try {
            const tag = req.params.tag;
            const { page, perPage } = req.query;
            const posts = await postService.getPostsByTag({
                tag,
                page: Number(page),
                perPage: Number(perPage),
            });
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    }

    static async updatePost(req, res, next) {
        try {
            const postId = req.params.id;
            // todo user id 부분 코드 보기
            const { user_id, week, tag, title } = req.body;
            const update = await postService.updatePost({
                postId,
                week,
                title,
                tag,
            });
            res.status(200).json(update.message);
        } catch (error) {
            next(error);
        }
    }

    static async findAllPost(req, res, next) {
        try {
            const { page, perPage } = req.query;
            const posts = await postService.getAllPost({
                page: Number(page),
                perPage: Number(perPage),
            });
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    }
}

export { postController };
