import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styled from "styled-components";
import * as Api from "../../api";

const EliceUserAuth = () => {
    const [answer, setAnswer] = useState(undefined);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await Api.post("user/auth", {
                answer,
            });
            const user = res.data;
            dispatch(loginUser(user));
            navigate("/", { replace: true });
        } catch (error) {
            console.log("인증에 실패햐였습니다.", error);
        }
    };

    return (
        <Container>
            <img
                src="/image/cal-bot.png"
                alt="거북이"
                style={{ width: "40%" }}
            />
            <Title>
                엘리스 레이서들의 <br />
                <span style={{ color: "#7353EA" }}>"체크인/체크아웃"</span>을
                책임지는
                <br />이 <span style={{ color: "#C0CE5D" }}>거북이</span>의
                이름은 무엇일까요?
            </Title>
            <SubTitle>
                * 띄어쓰기를 지켜서 작성해야 올바르게 적용됩니다.
            </SubTitle>

            <form onSubmit={(e) => handleSubmit(e)}>
                <TextField
                    variant="outlined"
                    style={{ width: "25%" }}
                    placeholder="정답을 적어주세요."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <Button type="submit">submit</Button>
            </form>
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    text-align: center;
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 25px;
`;

const SubTitle = styled.div`
    margin-bottom: 10px;
    color: gray;
`;

export default EliceUserAuth;
