import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styled from "styled-components";
import DOMPurify from "dompurify";
import Spinner from "components/Spinner";
import { useGetCurrentUser, usePostAuthAnswer } from "queries/userQuery";
import { useGetAuthData } from "queries/authQuery";

const EliceUserAuth = () => {
    const [curAnswer, setCurAnswer] = useState(undefined);
    // const [authData, setAuthData] = useState(undefined);
    const navigate = useNavigate();

    const { userData } = useGetCurrentUser();
    const { data, status } = useGetAuthData();
    const userState = userData?.userState?.payload || {};
    const { url, source } = data?.authData?.payload || {};

    const postAuthAnswer = usePostAuthAnswer();

    useEffect(() => {
        if (userState?.authorized) {
            navigate("/home");
            return;
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const answer = { answer: curAnswer };

        postAuthAnswer.mutate(answer, {
            onSuccess: (res) => {
                const result = res.data?.payload?.correct;
                if (result === false) {
                    alert(res.data.payload.message);
                } else {
                    alert("인증 성공!");
                    navigate("/home");
                }
            },
        });
    };

    if (status === "loading") return <Spinner />;

    return (
        <Container>
            <img src={url} alt="거북이" style={{ width: "40%" }} />
            <Title>
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(source),
                    }}
                />
            </Title>
            <SubTitle>* 띄어쓰기를 지켜서 작성해야 올바르게 적용됩니다.</SubTitle>

            <form
                onSubmit={handleSubmit}
                style={{ width: "30%", display: "flex", flexDirection: "row" }}
            >
                <TextField
                    variant="outlined"
                    size="small"
                    sx={{ width: "90%", minHeight: "50%" }}
                    placeholder="정답을 적어주세요."
                    value={curAnswer}
                    onChange={(e) => setCurAnswer(e.target.value)}
                />
                <Button variant="contained" type="submit">
                    제출
                </Button>
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
