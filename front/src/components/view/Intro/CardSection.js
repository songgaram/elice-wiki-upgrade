import styled from "styled-components";

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 100%;
  padding: 175px 0;
  height: 167vh;
  background-color: #ffffff;
  /* background-color: green; */
`;

const Title = styled.span`
  margin-bottom: 13px;
  font-size: 52px;
  font-style: normal;
  font-weight: bold;
  font-stretch: normal;
  line-height: 1.4em;
  color: #191f28;
  text-align: center;
  letter-spacing: normal;
  word-break: keep-all;
`;

const Description = styled.span`
  margin-bottom: 42px;
  font-size: 24px;
  font-style: normal;
  font-weight: normal;
  font-stretch: normal;
  line-height: 1.45em;
  color: #4e5968;
  text-align: center;
  letter-spacing: normal;
  word-break: keep-all;
`;

const CardWrapper = styled.div`
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
`;

const InnerWrapper = styled.div`
  width: 458px;
  height: 523px;
  margin: 14px 0;
  /* background-color: green; */
`;

const ImgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-image: url(https://static.toss.im/assets/homepage/team/team-1core.jpg);
  background-size: cover;
  border-radius: 16px;
  transition: background-image 0.3s ease;
`;

const TopSubtitle = styled.p`
  height: 0px;
  margin: 0px 0px 8px;
  overflow-y: hidden;
  font-size: 15px;
  line-height: 24px;
  color: rgba(0, 29, 54, 0.31);
  opacity: 0;
  transition: opacity 0.3s ease 0s, height 0.3s ease 0s;
`;

const CardTitle = styled.p`
  margin: 0 0 30px 0;
  font-size: 32px;
  font-weight: bold;
  line-height: 41px;
  color: #333d4b;
  transition: font-size 0.3s ease, line-height 0.3s ease;
`;

const PlusIconWrapper = styled.div`
  height: 24px;
  overflow-y: hidden;
  transition: height 0.3s ease 0s, opacity 0.3s ease 0s;
`;

const IconStyled = styled.span`
  height: 24px;
  width: 24px;
  min-width: 24px;
  color: rgb(51, 61, 75);
  display: inline-block;
  line-height: 0;
`;

const CardArticle = styled.p`
  margin: 0px;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.5;
  color: rgb(51, 61, 75);
  letter-spacing: -0.1px;
  opacity: 0;
  transition: opacity 0.3s ease 0s;
`;

const CardBox = styled.div`
  /* position: relative;
  width: 100%;
  height: 100%;
  padding: 32px;
  overflow: auto; */
  border-radius: 16px;
  &:hover ${ImgBox} {
    filter: blur(30px);
    transform: scale(1.2);
  }

  &:hover ${TopSubtitle} {
    height: 24px;
    opacity: 1;
  }

  &:hover ${CardTitle} {
    font-size: 25px;
    line-height: 33px;
  }

  &:hover ${PlusIconWrapper} {
    height: 0px;
    opacity: 0;
  }

  &:hover ${CardArticle} {
    display: block;
    opacity: 1;
  }
`;

const CardSection = () => {
  return (
    <TopContainer>
      <Title>멋진 타이틀</Title>
      <Description>멋진 서브 타이틀</Description>
      <CardWrapper>
        <InnerWrapper>
          <CardBox>

          </CardBox>
        </InnerWrapper>
        <InnerWrapper />
        <InnerWrapper />
        <InnerWrapper />
      </CardWrapper>
    </TopContainer>
  );
};

export default CardSection;
