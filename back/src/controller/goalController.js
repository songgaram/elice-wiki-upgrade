import { goalService } from "../services/goalService";
import fs from 'fs';

class goalController {
    static async insert(req, res, next) {
        const goals = fs.readFileSync('src/data/curriculum.json', 'utf8');
        const array = JSON.parse(goals);
        array.forEach(async (goal) =>
            await goalService.insertData({ title: goal.title || "", core_goal: goal.core_goal || "", goal1: goal.goal1 || "", goal2: goal.goal2 || "", goal3: goal.goal3 || "", week: goal.week || "" })
        );
        res.status(200).send("success")
    }

    static async findAllGoal(req, res, next) {
        const goals = await goalService.findAll();
        if (goals.message) {
            res.status(400).json(goals.message);
        } else {
            res.status(200).json(goals);
        }
    }

    static async findGoalByWeek(req, res, next) {
        try {
            const week = Number(req.params.week);
            const goal = await goalService.findGoalByWeek({ week });
            res.status(200).json({ status: "success", payload: goal });
        } catch (error) {
            next(error);
        }
    }
}

export { goalController };
