import { Button, Divider } from "@mui/material";
import styled from "styled-components";

const Home = () => {
    const handleClick = () => {};

    return (
        <>
            <div style={{ minHeight: "100vh", height: "auto" }}>
                <header style={{ height: "60px" }} />
                <WeekNav>
                    <Button disabled style={{ color: "black" }}>
                        WEEK
                    </Button>

                    {new Array(24).fill(null).map((_, week) => (
                        <>
                            <Button
                                sx={{
                                    minWidth: "2.5%",
                                    maxHeight: "50%",
                                    borderRadius: "30px",
                                    margin: "0 3px",
                                }}
                                onClick={handleClick}
                            >
                                {String(week + 1).padStart(2, "0")}
                            </Button>
                            <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                            />
                        </>
                    ))}

                    <Button
                        color="primary"
                        sx={{
                            minWidth: "2.5%",
                            maxHeight: "50%",
                            borderRadius: "30px",
                            margin: "0 3px",
                        }}
                    >
                        기타
                    </Button>
                </WeekNav>
                <Container>
                    <ContentsSide />
                    <Contents>
                        <div>
                            <div>tag</div>
                            <div>title</div>
                        </div>
                    </Contents>
                    <ContentsSide />
                </Container>
            </div>
        </>
    );
};

const WeekNav = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 40px;
    background-color: #f1f1f1;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 100px);
    background-color: #e1e1e1;
`;

const ContentsSide = styled.div`
    width: 25%;
    background-color: white;
`;

const Contents = styled.div`
    width: 50%;
    background-color: #f1f1f1;
    overflow: scroll;
`;

export default Home;
