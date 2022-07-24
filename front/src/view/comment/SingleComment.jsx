import { useState } from "react";
import CommentInput from "./CommentInput";
import CommentCard from "./CommentCard";
import { usePostRecomment } from "queries/commentQuery";

function SingleComment({ commentData }) {
    const [comment, setComment] = useState("");
    const [showReplyInput, setshowReplyInput] = useState(false);

    const postRecomment = usePostRecomment();

    const onReplyClick = () => {
        setshowReplyInput(!showReplyInput);
    };

    const handlePost = async (e) => {
        e.preventDefault();

        const RECOMMENT_DATA = {
            target: commentData,
            content: comment,
        };

        postRecomment.mutate(RECOMMENT_DATA);
        setshowReplyInput(false);
        setComment("");
    };

    return (
        <>
            <CommentCard
                commentData={commentData}
                onReplyClick={onReplyClick}
                setshowReplyInput={setshowReplyInput}
            />

            {/* reply 버튼을 누르면 Input이 열림. */}
            {showReplyInput && (
                <form onSubmit={handlePost}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <CommentInput comment={comment} setComment={setComment} />
                    </div>
                </form>
            )}
        </>
    );
}

export default SingleComment;
