import models, { Sequelize } from "../index";

const Op = Sequelize.Op;

class goalModel {
    static async insert({ newGoal }) {
        // 주차별 목표를 입력
        try {
            await models.Goal.create(newGoal);
            return {
                status: "succ",
                payload: "데이터 입력 성공!",
            };
        } catch (error) {
            if (error) {
                return {
                    status: "failed",
                    message: "데이터 입력에 실패했습니다.",
                };
            }
        }
    }

    static async findAllGoal() {
        // 전체 주차별 목표를 반환합니다.
        try {
            const goals = await models.Goal.findAll({});
            return {
                status: "succ",
                payload: goals,
            };
        } catch (error) {
            return {
                status: "failed",
                message: "저장된 목표가 없습니다!",
            };
        }
    }

    static async findByWeek({ week }) {
        try {
            const goal = await models.Goal.findOne({ where: { week } });
            return {
                status: "succ",
                payload: goal,
            };
        } catch (error) {
            return {
                status: "failed",
                message: "해당 주차의 목표가 없습니다.",
            };
        }
    }
}

export { goalModel };
