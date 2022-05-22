import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Box, Container, CssBaseline, Divider } from "@mui/material/";
import ContentEditForm from "./ContentEditForm";
import Comments from "../comment/Comments";
import * as Api from "../../api";
import BoardContents from "./BoardContents";

function BoardDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const contentId = params.id;
    const [boardData, setBoardData] = useState(undefined);
    const [isEditable, setIsEditable] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const userState = useSelector((state) =>
        state ? state.userReducer.user : undefined
    );

    const fetchContentInfo = async (contentId) => {
        try {
            const { data } = await Api.get("BoardDetails", contentId);
            if (data.payload?.userId === userState?.__id) {
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
        fetchContentInfo(contentId);
    }, [params]);

    if (!isFetchCompleted) {
        return "loading...";
    }

    const handleDelete = async () => {
        try {
            await Api.delete(`BoardDetails/${params.id}/delete`);
            navigate("/community");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Box
                    sx={{
                        width: "100%",
                        height: "100vh",
                        marginTop: "60px",
                    }}
                >
                    <Divider />
                    {isEditing ? (
                        <ContentEditForm
                            setIsEditing={setIsEditing}
                            contentId={contentId}
                            boardData={boardData}
                            setBoardData={setBoardData}
                        />
                    ) : (
                        <>
                            <BoardContents
                                boardData={boardData}
                                setIsEditing={setIsEditing}
                                isEditable={isEditable}
                                handleDelete={handleDelete}
                            />
                            <Comments
                            // comments={contents.comment}
                            // contentId={contentId}
                            />
                        </>
                    )}
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default BoardDetail;
