import { goalService } from "../services/goalService";

class goalController {
    static async insert(req, res, next) {
        const { week, goal } = req.body;
        const insert = await goalService.insertData({ week, goal });
        if (insert.status === "failed") {
            res.status(400).json(insert.message);
        } else {
            res.status(200).json(insert.payload);
        }
    }
}

export { goalController };
