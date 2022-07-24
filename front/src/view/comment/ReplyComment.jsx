import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import styled from "styled-components";

function ReplyComment({ commentData, commentList }) {
    const [childCommentNumber, setchildCommentNumber] = useState(0);
    const [openReply, setopenReply] = useState(false);

    const onClickViewMore = () => {
        setopenReply(!openReply);
    };

    // ===============================================
    // 댓글에 몇 개의 대댓글이 있는지 계산하는 로직
    // ===============================================

    useEffect(() => {
        let commentNumber = 0;
        //  댓글 전체 리스트를 가져온 후 각 댓글의 parentId가 현제 렌더하는 comment의 id와 일치하는 갯수
        commentList.map((el) => {
            if (el.parentId === commentData.id) {
                commentNumber++;
            }
        });
        setchildCommentNumber(commentNumber);
    }, [commentList]);

    // ====================================================================
    // 댓글의 아이디(parentId)와 같은 id를 responseTo로 가진 것을 렌더함
    // 대댓글 아래 대댓글이 있을 수 있으므로 SingleComment, ReplyComment를 같이 적어줌
    // ====================================================================

    const RenderReply = (parentId) =>
        commentList.map((commentData, index) => (
            <>
                {commentData.parentId === parentId && (
                    <div style={{ width: "90%", marginLeft: "40px" }}>
                        <SingleComment key={index} commentData={commentData} />
                        <ReplyComment
                            key={index}
                            commentData={commentData}
                            commentList={commentList}
                        />
                    </div>
                )}
            </>
        ));

    // ==================================
    // 실질적으로 렌더하는 부분
    // ==================================
    return (
        <>
            {childCommentNumber > 0 && (
                <ShowRecomment onClick={onClickViewMore}>
                    {openReply ? "▼" : "▶"} {childCommentNumber}개의 답글
                </ShowRecomment>
            )}
            {openReply && RenderReply(commentData.id)}
        </>
    );
}

const ShowRecomment = styled.div`
    width: 100%;
    padding-left: 2%;
    margin-left: 35px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
`;

export default ReplyComment;
