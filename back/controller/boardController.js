import is from "@sindresorhus/is";
import { boardService } from "../services/boardService";
import { headerError } from "../utils/errorMessages"

class boardController {
    static async addBoard(req, res, next) {
        try {
          if (is.emptyObject(req.body)) {
            throw new Error(headerError);
          }
          // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
        //   const userId = req.currentUserId;
          // req (request) 에서 데이터 가져오기
          const { userId, postId, title, body } = req.body

          const newBoard = await boardService.addBoard({
            userId,
            postId,
            title,
            body,
          });
    
          // if (newBoard.errorMessage) {
          //   throw new Error(newBoard.errorMessage);
          // }
      
          res.status(201).end();
        } catch (error) {
          next(error);
        }
    }

}
export { boardController };
