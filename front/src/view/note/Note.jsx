import Writer from "./Editor";
import styled from "styled-components";
import { useState } from "react";
import TextField from "@mui/material/TextField";

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

function Note() {
    // onChange로 관리할 Title 문자열
    const [title, setTitle] = useState("");
    // onChange로 관리할 해시태그 문자열
    const [hashtag, setHashtag] = useState("");
    // 해시태그를 담을 배열
    const [tag, setTag] = useState([]);

    const [week, setWeek] = useState("");

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeHashtag = (e) => {
        setHashtag(e.target.value);
    };

    const onChangeWeek = (e) => {
        setWeek(e.target.value);
    };

    const onKeyUp = (e) => {
        const $HashWrapOuter = document.querySelector(".HashWrapOuter");
        const $HashWrapInner = document.createElement("div");
        $HashWrapInner.className = "HashWrapInner";

        if (e.keyCode === 13 && e.target.value.trim() !== "") {
            $HashWrapInner.innerHTML = e.target.value;
            $HashWrapOuter.appendChild($HashWrapInner);
            setTag((hashArr) => [...hashArr, hashtag]);
            setHashtag("");
        }

        $HashWrapInner.addEventListener("click", () => {
            $HashWrapOuter?.removeChild($HashWrapInner);
            setTag(tag.filter((hashtag) => hashtag));
        });
    };

    return (
        <>
            <Wrapper>
                <Title type="text" placeholder="제목을 입력하세요" onChange={onChangeTitle} />
                <Line></Line>
                <div className="HashWrap">
                    <HashOuter className="HashWrapOuter"></HashOuter>
                    <TagInput
                        className="HashInput"
                        type="text"
                        value={hashtag}
                        onChange={onChangeHashtag}
                        onKeyUp={onKeyUp}
                        placeholder="태그를 입력하세요"
                    />
                    <TextOuter>
                        <TextField
                            required
                            type="number"
                            label="주차를 입력하세요"
                            variant="filled"
                            onChange={onChangeWeek}
                        />
                    </TextOuter>
                </div>
                <Writer title={title} tag={tag} week={week} />
            </Wrapper>
        </>
    );
}

export default Note;
