import Prism from "prismjs";
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  float: right;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: #12b886;
  color: white;
  border-radius: 4px;
  padding: 0px 1.25rem;
  height: 2rem;
  font-size: 1rem;
`;

const Writer = () => {
  const editorRef = useRef();
  const btnClickListener = () => {
    const editorInstance = editorRef.current.getInstance();
    const getContent_md = editorInstance.getMarkdown();
    console.log(getContent_md);
  };

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
      <Link to={"/"} style={{ textDecoration: "none" }}>
          &larr; 나가기
        </Link>
        <SubmitBtn onClick={btnClickListener}>출간하기</SubmitBtn>
    </>
  );
};

export default Writer;
