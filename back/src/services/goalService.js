import { goalModel } from "../db/models/goal/goal";

class goalService {
    static async insertData({ title, core_goal, goal1, goal2, goal3, week }) {
        // 데이터 입력
        const newGoal = {
            title,
            core_goal,
            goal1,
            goal2,
            goal3,
            week,
        };
        const insert = await goalModel.insert({ newGoal });
        return insert;
    }
}

export { goalService };
