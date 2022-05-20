import { Card, CardContent } from "@mui/material";
import styled from "styled-components";

function Goal({ goal }) {
    const { week, title, core_goal, goalList } = goal;
    return (
        <Card
            sx={{
                minWidth: 275,
                backgroundColor: "#E2DBFB",
                borderRadius: "20px",
            }}
        >
            <CardContent>
                <GoalHeader>
                    <img
                        style={{ width: "10%", marginRight: "5px" }}
                        src="/image/logo_small.png"
                        alt="엘리스위키 로고"
                    />
                    <HeaderTitle>Elice Racer's Goal</HeaderTitle>
                </GoalHeader>

                <Container>
                    <div
                        style={{
                            marginBottom: "30px",
                            color: "#7353EA",
                            fontWeight: "700",
                        }}
                    >
                        WEEK {week} : {title}
                    </div>
                    <div style={{ marginBottom: "50px" }}>
                        <GoalTitle>핵심목표</GoalTitle>

                        <GoalContents>{core_goal} </GoalContents>
                    </div>

                    <div>
                        <GoalTitle2 goalList={goalList}>주간목표</GoalTitle2>
                        {goalList.map((goal, idx) => (
                            <>
                                {goal === "" ? (
                                    <></>
                                ) : (
                                    <GoalContents>
                                        {idx + 1}. {goal}
                                    </GoalContents>
                                )}
                            </>
                        ))}
                    </div>
                </Container>
            </CardContent>
        </Card>
    );
}

const GoalHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`;

const HeaderTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 600;
`;

const GoalTitle2 = styled.div`
    color: #8b8b8c;
    font-weight: 500;
    margin-bottom: 10px;
    display: ${(props) => (props.goalList[0].length === 0 ? "none" : null)};
`;

const GoalTitle = styled.div`
    color: #8b8b8c;
    font-weight: 500;
    margin-bottom: 10px;
`;

const GoalContents = styled.div`
    font-size: 0.9rem;
    margin-bottom: 17px;
`;

const Container = styled.div``;

export default Goal;
