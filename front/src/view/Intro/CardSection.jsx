import styled from "styled-components";
import { Card1 } from "./Cards/Card1";
import { Card2 } from "./Cards/Card2";
import useScrollFadeIn from "hooks/useScrollFadeIn";

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 175px 0;
    background-color: #ffffff;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    float: left;
    margin: auto auto;
    padding: 0 3%;
`;

const Title = styled.span`
    margin: 0px 0px 16px;
    font-size: 46px;
    font-weight: bold;
    line-height: 56px;
    color: #000000;
    span {
        background: linear-gradient(90deg, #5438d1, #8938d1 60%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    @media screen and ${({ theme }) => theme.breakPoint} {
        font-size: 35px;
    }
`;

const Description = styled.span`
    margin: 0px 0px 32px;
    font-size: 18px;
    line-height: 29px;
    color: rgb(107, 118, 132);
    white-space: pre-line;

    @media screen and ${({ theme }) => theme.breakPoint} {
        font-size: 12px;
    }
`;

const CardWrapper = styled.div`
    z-index: 1;
    display: flex;
    margin: 0 auto;

    @media screen and ${({ theme }) => theme.breakPoint} {
        padding: 0 5%;
        flex-direction: column;
        align-items: center;
    }
`;

const InnerWrapper = styled.div`
    width: 100%;
    height: 523px;
    margin: 14px 22px;
`;

const CardSection = () => {
    const animatedItem = {
        0: useScrollFadeIn("up", 0.9, 0),
        1: useScrollFadeIn("up", 0.9, 0.1),
        2: useScrollFadeIn("up", 0.9, 0.1),
    };
    return (
        <>
            <TopContainer>
                <TextWrapper {...animatedItem[0]}>
                    <Title>
                        WHY <span>#elice-wiki?</span>
                    </Title>
                    <Description>
                        두 질문에 대한 답으로, 우리는 마음을 담아 #elice-wiki를 준비했습니다.
                    </Description>
                </TextWrapper>
                <CardWrapper {...animatedItem[1]}>
                    <InnerWrapper>
                        <Card1 />
                    </InnerWrapper>
                    <InnerWrapper {...animatedItem[2]}>
                        <Card2 />
                    </InnerWrapper>
                </CardWrapper>
            </TopContainer>
        </>
    );
};

export default CardSection;
