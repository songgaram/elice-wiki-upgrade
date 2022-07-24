import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Goal from "./goal";
import TagBtn from "./tag/TagBtn";
import WeekNav from "./week/WeekNav";
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
        <Container>
            <WeekNav />
            <PostContainer>
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
            </PostContainer>
        </Container>
    );
}

export default UserHome;

const Container = styled.div`
    width: 100%;
    overflow-x: hidden;
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const ContentsSide = styled.div`
    width: 20%;
    background-color: white;
    display: flex;
    padding: 2% 1%;
    text-align: center;
    flex-direction: column;
    align-items: center;

    @media screen and ${({ theme }) => theme.breakPoint} {
        display: none;
    }
`;

const Contents = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and ${({ theme }) => theme.breakPoint} {
        width: 100%;
        padding: 0 3%;
    }
`;
