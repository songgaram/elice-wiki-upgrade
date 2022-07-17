import Api from "libs/api";
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

const Writer = ({ title, week, tag }) => {
    const editorRef = useRef();
    const navigate = useNavigate();
    const btnClickListener = async () => {
        const editorInstance = editorRef.current.getInstance();
        const body = editorInstance.getMarkdown();
        try {
            await Api.post("newpost", {
                week,
                tag,
                title,
                body,
            });
            alert("게시글을 작성했습니다.");
            navigate("/home");
        } catch {
            alert("게시글 작성을 실패하였습니다.");
        }
    };

    const checkTitle = title !== "";
    const checkTag = tag !== "";
    const checkWeek = week !== "";
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
