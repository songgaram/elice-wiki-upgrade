import { Footer } from "./Footer";
import CardSection from "./CardSection";
import {
    MainContainer,
    SectionOne,
    TextWarpper,
    InnerWrapper,
    BtnWrapper,
    Description,
    SubSection,
    SubDescription,
    ScrollDownArrow,
} from "./Intro.style";
import { DescSection } from "./DescSection";
import useScrollFadeIn from "hooks/useScrollFadeIn";
import OAuthButton from "view/auth/OAuthButton";

const Intro = () => {
    const animatedItem = {
        0: useScrollFadeIn("up", 0.9, 0),
        1: useScrollFadeIn("up", 0.9, 0.1),
    };
    return (
        <MainContainer>
            <SectionOne>
                <div style={{ position: "relative" }}>
                    <TextWarpper>
                        <InnerWrapper>
                            <h>
                                엘리스 레이서,
                                <br />
                                학습 내용을 내 것으로
                            </h>
                            <Description {...animatedItem[0]}>
                                본 서비스는 엘리스에서 주관하는 교육 상황에서의 빠르고 많은
                                <br />
                                학습량과 구글링을 중심으로 한 프로그래밍 학습의 특성을 반영하여
                                <br />
                                제안된 위키 서비스입니다.
                            </Description>
                            <BtnWrapper>
                                <OAuthButton />
                            </BtnWrapper>
                            <ScrollDownArrow>
                                <span></span>
                                <span></span>
                                <span></span>
                            </ScrollDownArrow>
                        </InnerWrapper>
                    </TextWarpper>
                </div>
            </SectionOne>
            <SubSection>
                <SubDescription {...animatedItem[1]}>
                    자신의 학습을 기록하고, 다른 레이서들의 기록으로 함께 학습해보세요.
                    <br />
                    <span>#elice-wiki</span>는 엘리스 AI 트랙에 참여하는 레이서들의
                    <br />
                    <span>지식 공동체</span>입니다.
                </SubDescription>
            </SubSection>
            <CardSection />
            <DescSection />
            <Footer />
        </MainContainer>
    );
};

export default Intro;
