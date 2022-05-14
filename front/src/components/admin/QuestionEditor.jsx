import React from "react";
import styled from "styled-components";

const QuestionEditor = () => {
  const [value, setValue] = React.useState("<h4>소스코드입력</h4>");
  const [url, setUrl] = React.useState("image/cal-bot.png");
  const [source, setSource] = React.useState();
  const onChangeHandler = (e) => {
    if (e.target.id === "imgurl") {
      setUrl(e.target.value);
    } else if (e.target.id === "sourcecode") {
      setSource(e.target.value);
    }
  };
  const clickHandler = () => {
    setValue({
      url,
      source,
    });
  };
  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center" }}>
      <Wrapper>
        <div style={{ width: "40vw" }}>
          <label for="imgurl">Img URL</label>
          <img src="image/questionMark.png" style={{ display: "inline-block", height: "14px", marginLeft: "10px" }} />
          <ImgUrl id="imgurl" placeholder="Img URL( https://images.unsplash.com/photo-164... )" value={url} onChange={onChangeHandler} />
          <label for="sourcecode">Source Code</label>
          <InputArea id="sourcecode" placeholder="Type your source code here..." value={source} onChange={onChangeHandler} />
        </div>
        <div style={{ margin: "0 1vw 0 1vw", height: "40vh", width: "10vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <img src="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-droite-noir.png" alt="Right Arrow Icon Png" />
          <button onClick={clickHandler}>미리보기</button>
          <button style={{ marginTop: "5%" }} onClick={clickHandler}>
            저장하기
          </button>
        </div>
        <div>
          <label for="preview">Preview</label>
          <Preview id="preview">
            <img src="image/logo_large.png" style={{ height: "5%", position: "relative", top: "1%", left: "1%" }} />
            <div style={{ height: "94%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              {value && (
                <div style={{ height: "50%" }}>
                  <img src={value.url || "image/cal-bot.png"} style={{ height: "50%" }} />
                  <div dangerouslySetInnerHTML={{ __html: value.source || "<h4>소스코드입력</h4>" }} style={{ height: "50%", textAlign: "center" }} />
                </div>
              )}
              <img src="image/Answer_the_question.png" style={{ height: "10%" }} />
            </div>
          </Preview>
        </div>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ImgUrl = styled.input`
  height: auto;
  width: 40vw;
  margin: 0;
  margin-bottom: 10px;
`;
const InputArea = styled.textarea`
  height: 25vh;
  width: 40vw;
  resize: none;
  margin: 0;
`;
const Preview = styled.div`
  height: 40vh;
  width: 40vw;
  border: 1px solid black;
`;
export default QuestionEditor;
