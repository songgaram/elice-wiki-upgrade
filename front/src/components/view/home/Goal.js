import { Card, CardContent } from "@mui/material";
import styled from "styled-components";

function Goal({ goal }) {
    const { week, title, core_goal } = goal;
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <GoalHeader>
                    <img
                        style={{ width: "10%", marginRight: "5px" }}
                        src="/image/logo_small.png"
                        alt="엘리스위키 로고"
                    />
                    <HeaderTitle>Elice Racer's Goal</HeaderTitle>
                </GoalHeader>

                <GoalContents>
                    <div>
                        week {week} : {title}
                    </div>
                    <div>
                        핵심목표 <br />
                        {core_goal}
                    </div>

                    <div>
                        주간목표 <br />
                    </div>
                </GoalContents>
            </CardContent>
        </Card>
    );
}

const GoalHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const HeaderTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 500;
`;

const GoalContents = styled.div``;

export default Goal;
