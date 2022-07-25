import React from "react";
import { CreateRounded, LibraryBooksRounded, CommentRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled as Styled } from "@mui/material/styles";

import { useGetMyBoards, useGetMyComments, useGetMyPosts } from "queries/mypageQuery";
import Loader from "components/Loader";

const Accordion = Styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = Styled((props) => <MuiAccordionSummary {...props} />)(({ theme }) => ({
    cursor: "default !important",
    alignItems: "flex-start !important",
    flexDirection: "row",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(0deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(0),
        marginBottom: 0,
    },
}));

const AccordionDetails = Styled(MuiAccordionDetails)(({ theme }) => ({ paddingTop: "0" }));

const MyPostList = ({ user }) => {
    const navigate = useNavigate();
    var boardFirstList = [];
    var postFirstList = [];
    var commentFirstList = [];
    var boardList = [];
    var postList = [];
    var commentList = [];
    const [expanded, setExpanded] = React.useState([]);

    const handleClick = (panel) => {
        if (expanded.includes(panel)) {
            const newExpanded = expanded.filter((items) => items !== panel);
            setExpanded(newExpanded);
        } else {
            const newExpanded = [...expanded, panel];
            setExpanded(newExpanded);
        }
    };

    const { data, status } = useGetMyPosts();
    const { postListInfo } = data?.payload || [];
    const boardData = useGetMyBoards(user.__id);
    const commentData = useGetMyComments(user.__id);

    if (postListInfo?.length > 3) {
        postFirstList = postListInfo?.slice(0, 3);
        postList = postListInfo?.slice(3);
    } else {
        postFirstList = postListInfo;
    }
    if (boardData?.data?.length > 3) {
        boardFirstList = boardData?.data?.slice(0, 3);
        boardList = boardData?.data?.slice(3);
    } else {
        boardFirstList = boardData?.data;
    }
    if (commentData?.data?.length > 3) {
        commentFirstList = commentData?.data?.slice(0, 3);
        commentList = commentData?.data?.slice(3);
    } else {
        commentFirstList = commentData?.data;
    }

    if (status === "loading") return <Loader />;
    return (
        <Container>
            <InnerContainer>
                <Wrapper>
                    <AccordionSummary
                        aria-controls="POSTS"
                        id="POSTS"
                        expandIcon={
                            expanded.includes("POSTS") ? (
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        marginTop: "36px",
                                    }}
                                    onClick={() => handleClick("POSTS")}
                                >
                                    - 줄이기
                                </div>
                            ) : (
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        marginTop: "36px",
                                    }}
                                    onClick={() => handleClick("POSTS")}
                                >
                                    + 더보기
                                </div>
                            )
                        }
                    >
                        <CreateRounded sx={{ fontSize: "3rem" }} />
                        <Typo>포스팅</Typo>
                        <TypoExp>내가 작성한 포스트</TypoExp>
                    </AccordionSummary>
                    <Accordion expanded={expanded.includes("POSTS")}>
                        <AccordionSummary>
                            <ul>
                                {postFirstList &&
                                    postFirstList?.map((post, index) => {
                                        return (
                                            <List key={`Fpost-${index}`}>
                                                <Link
                                                    onClick={() => {
                                                        /*navigate(`/board/${post.post_id}`)*/
                                                    }}
                                                >
                                                    {post.title}
                                                </Link>
                                            </List>
                                        );
                                    })}
                            </ul>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {postList &&
                                    postList?.map((post, index) => {
                                        return (
                                            <List key={`post-${index}`}>
                                                <Link
                                                    onClick={() => {
                                                        /*navigate(`/board/${post.post_id}`)*/
                                                    }}
                                                >
                                                    {post.title}
                                                </Link>
                                            </List>
                                        );
                                    })}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </Wrapper>
                <Wrapper style={{ borderTop: "1px solid #9880F0" }}>
                    <AccordionSummary
                        aria-controls="BOARD"
                        id="BOARD"
                        expandIcon={
                            expanded.includes("BOARD") ? (
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        marginTop: "36px",
                                    }}
                                    onClick={() => handleClick("BOARD")}
                                >
                                    - 줄이기
                                </div>
                            ) : (
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        marginTop: "36px",
                                    }}
                                    onClick={() => handleClick("BOARD")}
                                >
                                    + 더보기
                                </div>
                            )
                        }
                    >
                        <LibraryBooksRounded sx={{ fontSize: "3rem" }} />
                        <Typo>게시판</Typo>
                        <TypoExp>내가 작성한 게시글</TypoExp>
                    </AccordionSummary>
                    <Accordion expanded={expanded.includes("BOARD")}>
                        <AccordionSummary>
                            <ul>
                                {boardFirstList &&
                                    boardFirstList?.map((board, index) => {
                                        return (
                                            <List key={`Fboard-${index}`}>
                                                <Link
                                                    onClick={() => {
                                                        navigate(`/board/${board.boardId}`);
                                                    }}
                                                >
                                                    {board.title}
                                                </Link>
                                            </List>
                                        );
                                    })}
                            </ul>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {boardList &&
                                    boardList?.map((board, index) => {
                                        return (
                                            <List key={`board-${index}`}>
                                                <Link
                                                    onClick={() => {
                                                        navigate(`/board/${board.boardId}`);
                                                    }}
                                                >
                                                    {board.title}
                                                </Link>
                                            </List>
                                        );
                                    })}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </Wrapper>
                <Wrapper style={{ borderTop: "1px solid #9880F0" }}>
                    <AccordionSummary
                        aria-controls="COMMENTS"
                        id="COMMENTS"
                        expandIcon={
                            expanded.includes("COMMENTS") ? (
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        marginTop: "36px",
                                    }}
                                    onClick={() => handleClick("COMMENTS")}
                                >
                                    - 줄이기
                                </div>
                            ) : (
                                <div
                                    style={{
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        marginTop: "36px",
                                    }}
                                    onClick={() => handleClick("COMMENTS")}
                                >
                                    + 더보기
                                </div>
                            )
                        }
                    >
                        <CommentRounded sx={{ fontSize: "3rem" }} />
                        <Typo>댓글</Typo>
                        <TypoExp>내가 작성한 댓글</TypoExp>
                    </AccordionSummary>
                    <Accordion expanded={expanded.includes("COMMENTS")}>
                        <AccordionSummary>
                            <ul>
                                {commentFirstList &&
                                    commentFirstList?.map((comment, index) => {
                                        return (
                                            <List key={`Fcomment-${index}`}>
                                                <Link
                                                    onClick={() => {
                                                        navigate(`/board/${comment.boardId}`);
                                                    }}
                                                >
                                                    {comment.content}
                                                </Link>
                                            </List>
                                        );
                                    })}
                            </ul>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {commentList &&
                                    commentList?.map((comment, index) => {
                                        return (
                                            <List key={`comment-${index}`}>
                                                <Link
                                                    onClick={() => {
                                                        navigate(`/board/${comment.boardId}`);
                                                    }}
                                                >
                                                    {comment.content}
                                                </Link>
                                            </List>
                                        );
                                    })}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </Wrapper>
            </InnerContainer>
        </Container>
    );
};
const InnerContainer = styled.div`
    width: 60%;
    @media screen and ${({ theme }) => theme.breakPoint} {
        width: 100%;
    }
`;

const Typo = styled.span`
    font-size: 2.2rem;
    font-weight: bold;
    margin-left: 1rem;
    height: 48px;
    @media screen and ${({ theme }) => theme.breakPoint} {
        font-size: 2rem;
    }
`;

const TypoExp = styled.span`
    margin-left: 0.7rem;
    position: relative;
    top: 22px;
    @media screen and ${({ theme }) => theme.breakPoint} {
        display: none;
    }
`;

const Link = styled.a`
    font-size: 1.2rem;
    cursor: pointer;
    padding: 8px;
    text-decoration: underline;
    &:hover {
        opacity: 0.5;
    }
`;
const Wrapper = styled.div`
    padding: 30px 0 30px 0;
`;
const List = styled.li`
    padding: 4px;
    margin: 12px 0 0 2rem;
`;
const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
export default MyPostList;
