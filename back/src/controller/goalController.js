import { goalService } from "../services/goalService";

class goalController {
    static async insert(req, res, next) {
        const { title, core_goal, goal1, goal2, goal3, week } = req.body;
        const insert = await goalService.insertData({
            title,
            core_goal,
            goal1,
            goal2,
            goal3,
            week,
        });
        if (insert.status === "failed") {
            res.status(400).json(insert.message);
        } else {
            res.status(200).json(insert.payload);
        }
    }

    static async findAllGoal(req, res, next) {
        const goals = await goalService.findAll();
        if (goals.message) {
            res.status(400).json(goals.message);
        } else {
            res.status(200).json(goals);
        }
    }
}

export { goalController };
