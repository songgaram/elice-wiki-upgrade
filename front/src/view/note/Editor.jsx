import Prism from "prismjs";
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { useRef } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useCreateNewPost } from "queries/postQuery";

const Writer = ({ title, week, tag }) => {
    const editorRef = useRef();
    const navigate = useNavigate();

    const createNewPost = useCreateNewPost();

    const btnClickListener = () => {
        const editorInstance = editorRef.current.getInstance();
        const body = editorInstance.getMarkdown();

        const POST_DATA = {
            week,
            tag,
            title,
            body,
        };

        createNewPost.mutate(POST_DATA);
        alert("게시글을 작성했습니다.");
        navigate("/home");
    };

    const checkTitle = title !== "";
    const checkTag = tag.length > 0;
    const checkWeek = Number(week) > 0 && Number(week) < 25;
    const validation = checkTitle && checkTag && checkWeek;

    return (
        <>
            <Editor
                plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                placeholder="공유하고 싶은 학습 내용을 적어보세요!"
                previewStyle="vertical"
                height="500px"
                initialEditType="markdown"
                useCommandShortcut={true}
                ref={editorRef}
            />
            <Button onClick={() => navigate(-1)}>&larr; 이전으로</Button>
            <Button variant="contained" onClick={btnClickListener} disabled={!validation}>
                출간하기
            </Button>
        </>
    );
};

export default Writer;
