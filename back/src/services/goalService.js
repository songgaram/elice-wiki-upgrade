import { goalModel } from "../db/models/goal/goal";

class goalService {
    static async insertData({ week, goal }) {
        // 데이터 입력
        const newGoal = {
            week,
            goal,
        };
        const insert = await goalModel.insert({ newGoal });
        return insert;
    }
}

export { goalService };
