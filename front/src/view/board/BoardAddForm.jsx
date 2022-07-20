import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Box, Grid, Button } from "@mui/material";
import WriteForm from "./WriteForm";
import { usePostBoard } from "queries/boardQuery";

function BoardAddForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [header, setHeader] = useState("");

    const postBoard = usePostBoard();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const boardData = {
            header,
            title,
            body,
        };

        postBoard.mutate(boardData);
        alert("게시글 등록을 성공하였습니다.");
        navigate(`/board`);
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <form onSubmit={handleSubmit}>
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
                        <Button type="submit">등록</Button>
                        <Button color="error" onClick={() => navigate(`/board`)}>
                            취소
                        </Button>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

export default BoardAddForm;
