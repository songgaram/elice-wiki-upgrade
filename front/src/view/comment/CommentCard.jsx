import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteComment } from "queries/commentQuery";
import { useQueryClient } from "react-query";
import styled from "styled-components";

function CommentCard({ commentData, onReplyClick, setshowReplyInput }) {
    const { userName, content, userId, commentId, boardId, isDeleted } = commentData;
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState(false);

    const queryClient = useQueryClient();
    const { userState } = queryClient.getQueryData("userState");
    const curUserId = userState?.payload?.__id;
    const profileImg = userState?.payload?.profile_img;

    const deleteComment = useDeleteComment(commentId);

    useEffect(() => {
        if (userId === curUserId) {
            setIsEditable(true);
        } else {
            setIsEditable(false);
        }
    }, [userId, curUserId]);

    const handleDelete = async () => {
        if (window.confirm("댓글을 삭제할 건가요?")) {
            deleteComment.mutate();
            navigate(`/board/${boardId}`);
        }
    };

    return (
        <CardContainer>
            <CardHeader>
                <img src={profileImg} alt="유저 프로필" />
                {userName}

                {isEditable && (
                    <IconContainer>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </IconContainer>
                )}
            </CardHeader>

            {isDeleted ? (
                <CardContent>삭제된 댓글입니다.</CardContent>
            ) : (
                <CardContent>
                    {content}

                    <RecommentBtn onClick={() => onReplyClick(setshowReplyInput)}>
                        답글 달기
                    </RecommentBtn>
                </CardContent>
            )}
        </CardContainer>
    );
}

const CardContainer = styled.div`
    width: 100%;
    padding: 1% 1% 0 2%;
`;

const CardHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    img {
        margin-right: 10px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }
`;

const IconContainer = styled.div`
    margin-left: auto;
    width: auto;
`;

const CardContent = styled.div`
    padding-left: 35px;
`;

const RecommentBtn = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray03};
    margin: 5px 0;
    cursor: pointer;
`;

export default CommentCard;
