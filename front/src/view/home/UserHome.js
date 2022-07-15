import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Goal from "./Goal";
import TagBtn from "./TagBtn";
import WeekNav from "./WeekNav";
import Header from "../Header";
// import RecentList from "./RecentList";
import Loader from "components/Loader";
import { useGetTagData } from "queries/tagQuery";
import { useGetGoalData } from "queries/goalQuery";

function UserHome() {
    const params = useParams();
    const week = params.week;

    const { data, status } = useGetTagData();
    const tags = data?.tagData?.payload || {};

    const res = useGetGoalData(week);
    const goal = res.data?.goalData?.payload;

    if (status === "loading") return <Loader />;

    return (
        <>
            <div style={{ minHeight: "100vh", height: "auto" }}>
                <Header />
                <WeekNav />
                <Container>
                    <ContentsSide>
                        <div style={{ padding: "0 3%" }}>
                            <TagBtn tags={tags} />
                        </div>
                    </ContentsSide>
                    <Contents>
                        <Outlet />
                    </Contents>
                    <ContentsSide>
                        {goal && <Goal goal={goal} />}
                        {/* <RecentList /> */}
                    </ContentsSide>
                </Container>
            </div>
        </>
    );
}

export default UserHome;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 100px);
`;

const ContentsSide = styled.div`
    width: 17.5%;
    background-color: white;
    display: flex;
    padding: 2% 1%;
    text-align: center;
    flex-direction: column;
    align-items: center;
`;

const Contents = styled.div`
    width: 65%;
`;
