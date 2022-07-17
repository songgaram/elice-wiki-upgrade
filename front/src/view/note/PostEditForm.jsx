import styled from "styled-components";
import { useState } from "react";
import TextField from "@mui/material/TextField";
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
import { useSetRecoilState, useRecoilValue } from "recoil";
import { infoAtom, postAtom, tagAtom, titleAtom, weekAtom } from "state/atoms";

const Wrapper = styled.div`
    padding-top: 2rem;
    padding-left: 3rem;
    padding-right: 3rem;
`;

const Title = styled.input`
    background: transparent;
    display: block;
    padding: 0px;
    font-size: 2.75rem;
    resize: none;
    line-height: 1.5;
    outline: none;
    border: none;
    font-weight: bold;
    color: black;
`;

const Line = styled.div`
    background: rgb(73, 80, 87);
    height: 5px;
    width: 4rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 1px;
`;

const TagInput = styled.input`
    background: transparent;
    display: inline-flex;
    outline: none;
    cursor: text;
    font-size: 1.125rem;
    line-height: 2rem;
    margin-bottom: 0.75rem;
    min-width: 8rem;
    border: none;
    color: black;
`;

const HashOuter = styled.div`
    display: flex;
    flex-wrap: wrap;
    .HashWrapInner {
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        height: 2rem;
        border-radius: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: #f8f9fa;
        color: #7353ea;
        margin-right: 0.75rem;
        margin-bottom: 0.75rem;
        cursor: pointer;
    }
`;

const TextOuter = styled.div`
    display: flex;
    flex-wrap: wrap;
    display: inline-flex;
    align-items: center;
    margin-left: 25px;
`;

function PostEditForm() {
    const info = useRecoilValue(infoAtom);
    const post = useRecoilValue(postAtom);

    const setTitle = useSetRecoilState(titleAtom);
    const setTag = useSetRecoilState(tagAtom);
    const setWeek = useSetRecoilState(weekAtom);

    // onChange로 관리할 Title 문자열
    const [curtitle, setCurTitle] = useState(info.title);
    // onChange로 관리할 해시태그 문자열
    const [curHashtag, setCurHashtag] = useState("");
    // 해시태그를 담을 배열
    const [curTag, setCurTag] = useState([info.tag]);

    const [curWeek, setCurWeek] = useState(info.week);

    const editorRef = useRef();
    const navigate = useNavigate();
    const btnClickListener = async () => {
        const editorInstance = editorRef.current.getInstance();
        const body = editorInstance.getMarkdown();
        await Api.put(`post/update/${info.post_id}`, {
            week: curWeek,
            tag: curTag,
            title: curtitle,
            body,
        });
        setTitle(curtitle);
        setTag(curTag);
        setWeek(curWeek);
        alert("게시글을 수정하였습니다.");
        navigate(-1);
    };

    const checkTitle = curtitle !== "";

    const onChangeTitle = (e) => {
        setCurTitle(e.target.value);
    };

    const onChangeHashtag = (e) => {
        setCurHashtag(e.target.value);
    };

    const onChangeWeek = (e) => {
        setCurWeek(e.target.value);
    };

    const onKeyUp = (e) => {
        const $HashWrapOuter = document.querySelector(".HashWrapOuter");
        const $HashWrapInner = document.createElement("div");
        $HashWrapInner.className = "HashWrapInner";

        if (e.keyCode === 13 && e.target.value.trim() !== "") {
            $HashWrapInner.innerHTML = e.target.value;
            $HashWrapOuter.appendChild($HashWrapInner);
            setCurTag((hashArr) => [...hashArr, curHashtag]);
            setCurHashtag("");
        }

        $HashWrapInner.addEventListener("click", () => {
            $HashWrapOuter?.removeChild($HashWrapInner);
            setCurTag(curTag.filter((hashtag) => hashtag));
        });
    };

    return (
        <>
            <Wrapper>
                <Title
                    type="text"
                    placeholder="제목을 입력하세요"
                    defaultValue={curtitle}
                    onChange={onChangeTitle}
                />
                <Line></Line>
                <div className="HashWrap">
                    <HashOuter className="HashWrapOuter"></HashOuter>
                    <TagInput
                        className="HashInput"
                        type="text"
                        value={curHashtag}
                        defaultValue={curTag}
                        onChange={onChangeHashtag}
                        onKeyUp={onKeyUp}
                        placeholder="태그를 입력하세요"
                    />
                    <TextOuter>
                        <TextField
                            required
                            type="text"
                            label="주차를 입력하세요"
                            variant="filled"
                            defaultValue={curWeek}
                            onChange={onChangeWeek}
                        />
                    </TextOuter>
                </div>
                <Editor
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                    placeholder="공유하고 싶은 학습 내용을 적어보세요!"
                    previewStyle="vertical"
                    height="500px"
                    initialEditType="markdown"
                    initialValue={post}
                    useCommandShortcut={true}
                    ref={editorRef}
                />
                <Button onClick={() => navigate(-1)}>&larr; 이전으로</Button>
                <Button variant="contained" onClick={btnClickListener} disabled={!checkTitle}>
                    수정하기
                </Button>
            </Wrapper>
        </>
    );
}

export default PostEditForm;
