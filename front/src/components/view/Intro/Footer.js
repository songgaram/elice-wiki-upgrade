import styled from "styled-components";

const FooterSection = styled.section`
  min-height: 300px;
  width: 100%;
  display: block;
  padding: 125px 48px 85px 48px;
  max-width: calc(1040px + 48px + 48px);
  margin: 0 auto;
`;

const FooterWrapper = styled.div`
  background-image: linear-gradient(
    109.6deg,
    rgba(245, 239, 249, 1) 30.1%,
    rgba(207, 211, 236, 1) 100.2%
  );
  border-radius: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 126px;
  height: 500px;
`;

const FooterText = styled.p`
  font-size: 48px;
  margin-top: 75px;
  margin-bottom: 40px;
  font-weight: 800;
  line-height: 1.3;
  text-align: center;
  color: #333d4b;

  span {
    background: linear-gradient(90deg, #5438d1, #8938d1 60%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FooterBtn = styled.div`
  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
  display: flex;
  align-items: center;
  font-size: 28px;
  padding: 20px 30px;
  border-radius: 43px;
  font-weight: bold;
  transition: background-color 0.35s ease;
  font-size: 18px;
  background-color: #191f28;
  color: #ffffff;
  cursor: pointer;
`;

export const Footer = () => {
  return (
    <FooterSection>
      <FooterWrapper>
        <FooterText>
          레이서를 위한 서비스, <span>elice-wiki</span>
          <br />
          지금 바로 사용해보세요.
        </FooterText>
        <FooterBtn>학습 내용 기록하러 가기 &rarr;</FooterBtn>
      </FooterWrapper>
    </FooterSection>
  );
};
