import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Api from "../../../api";

function CommentCard({ comment }) {
    const { userName, content, userId, commentId, boardId, isDeleted } = comment;
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState(false);

    const userState = useSelector((state) => (state ? state.userReducer.user : undefined));

    useEffect(() => {
        if (userId === userState?.__id) {
            setIsEditable(true);
        } else {
            setIsEditable(false);
        }
    }, []);

    const handleDelete = async () => {
        try {
            if (window.confirm("댓글을 삭제할 건가요?")) {
                await Api.delete(`comments/${commentId}`);
                navigate(`/board/${boardId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardHeader
                action={
                    isEditable && (
                        <>
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    )
                }
                subheader={userName}
            />
            {isDeleted ? (
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        삭제된 댓글입니다.
                    </Typography>
                </CardContent>
            ) : (
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        {content}
                    </Typography>
                </CardContent>
            )}
        </Card>
    );
}

export default CommentCard;
