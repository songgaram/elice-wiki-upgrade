import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import WriteForm from "./WriteForm";
import { useUpdateBoard } from "queries/boardQuery";

function ContentEditForm({ boardData, setIsEditing, boardId }) {
    const [title, setTitle] = useState(boardData.title);
    const [body, setBody] = useState(boardData.body);
    const [header, setHeader] = useState(boardData.header);

    const updataBoard = useUpdateBoard(boardId);

    const handleEdit = (e) => {
        e.preventDefault();

        const BOARD_DATA = {
            header,
            title,
            body,
        };

        updataBoard.mutate(BOARD_DATA);
        alert("게시글을 수정하였습니다.");
        setIsEditing(false);
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
            }}
        >
            <form onSubmit={handleEdit}>
                <WriteForm
                    title={title}
                    setTitle={setTitle}
                    body={body}
                    setBody={setBody}
                    header={header}
                    setHeader={setHeader}
                />
                <Grid
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <Button type="submit">수정 완료</Button>
                    <Button color="error" onClick={() => setIsEditing(false)}>
                        취소
                    </Button>
                </Grid>
            </form>
        </Box>
    );
}

export default ContentEditForm;
