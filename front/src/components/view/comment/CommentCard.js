import React, { useEffect, useState } from "react";
import { CardContent, CardHeader, Typography, IconButton, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { timeForToday } from "./CommentTool";
import * as Api from "../../../api";

function CommentCard({ commentData, onReplyClick, setshowReplyInput }) {
    const { userName, content, userId, commentId, boardId, isDeleted, profileImg, createdAt } =
        commentData;
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
        <div>
            <CardHeader
                avatar={
                    <Avatar sx={{ width: 24, height: 24 }} alt="유저 프로필" src={profileImg} />
                }
                action={
                    isEditable && (
                        <>
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    )
                }
                title={`${userName} | ${timeForToday(createdAt)}`}
            />

            {isDeleted ? (
                <CardContent>
                    <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
                        삭제된 댓글입니다.
                    </Typography>
                </CardContent>
            ) : (
                <CardContent style={{ paddingBottom: "0" }}>
                    <Typography sx={{ fontSize: 15, ml: 1 }} color="text.primary" gutterBottom>
                        {content}
                    </Typography>
                    <Button
                        size="small"
                        color="binary"
                        onClick={() => onReplyClick(setshowReplyInput)}
                    >
                        <Typography sx={{ fontSize: 12 }}>답글 달기</Typography>
                    </Button>
                </CardContent>
            )}
        </div>
    );
}

export default CommentCard;
