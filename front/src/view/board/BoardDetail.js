import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material/";
import BoardEditForm from "./BoardEditForm";
import BoardContents from "./BoardContents";
import Spinner from "components/Spinner";
import Comment from "../comment/Comment";
import Api from "libs/api";
import { useQueryClient } from "react-query";

function BoardDetail() {
    const params = useParams();
    const boardId = params.id;
    const [boardData, setBoardData] = useState(undefined);
    const [commentList, setCommentList] = useState(undefined);
    const [isEditable, setIsEditable] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const queryClient = useQueryClient();
    const { userState } = queryClient.getQueryData("userState");
    const userId = userState?.payload?.__id;

    const fetchCommentList = async () => {
        try {
            const { data } = await Api.get("commentlist/board", boardId);
            setCommentList(data.payload);
        } catch (e) {
            console.log("댓글을 불러오는데 실패했습니다.", e);
        }
    };

    const fetchDetailInfo = async () => {
        try {
            const { data } = await Api.get("boards", boardId);
            if (data.payload?.userId === userId) {
                setIsEditable(true);
            } else {
                setIsEditable(false);
            }
            setBoardData(data.payload);
            setIsFetchCompleted(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDetailInfo();
        fetchCommentList();
    }, [params]);

    if (!isFetchCompleted) {
        return <Spinner />;
    }

    return (
        <React.Fragment>
            <Container maxWidth="md">
                <Box
                    sx={{
                        width: "100%",
                        height: "100vh",
                        marginTop: "3%",
                    }}
                >
                    {isEditing ? (
                        <BoardEditForm
                            setIsEditing={setIsEditing}
                            boardId={boardId}
                            boardData={boardData}
                            setBoardData={setBoardData}
                        />
                    ) : (
                        <>
                            <BoardContents
                                boardData={boardData}
                                setIsEditing={setIsEditing}
                                isEditable={isEditable}
                            />
                            <Comment boardId={boardId} commentList={commentList} />
                        </>
                    )}
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default BoardDetail;
