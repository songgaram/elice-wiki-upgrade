import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material/";
import BoardEditForm from "./BoardEditForm";
import BoardContents from "./BoardContents";
import Spinner from "components/Spinner";
import Comment from "../comment";
import { useQueryClient } from "react-query";
import { useGetCommentList, useGetBoardData } from "queries/boardQuery";

function BoardDetail() {
    const params = useParams();
    const boardId = params.id;
    const [isEditable, setIsEditable] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const queryClient = useQueryClient();
    const { userState } = queryClient.getQueryData("userState");
    const userId = userState?.payload?.__id;

    const res = useGetCommentList(boardId);
    const commentList = res?.data?.payload;

    const { data, status } = useGetBoardData(boardId);
    const boardData = data?.boardData?.payload;

    useEffect(() => {
        if (boardData?.userId === userId) {
            setIsEditable(true);
        } else {
            setIsEditable(false);
        }
    }, [boardData?.userId, userId]);

    if (status === "loading") return <Spinner />;

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
