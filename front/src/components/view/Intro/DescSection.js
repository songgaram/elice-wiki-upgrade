import styled from "styled-components";

const DescWrapper = styled.section`
  background: #f9fafb;
  padding: 100px 80px;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  padding-left: 0;
`;

const Title = styled.span`
  color: #000;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 23px;
  font-size: 37px;
`;

const Description = styled.span`
  color: #333d4b;
  font-size: 17px;
  max-width: 374px;
  font-weight: 500;
  line-height: 1.6;
`;

export const DescSection = () => {
  return (
    <DescWrapper>
      <InnerWrapper>
        <ContentWrapper>
          <Title>간단한 기능설명</Title>
          <Description>
            엘리스 위키는 기본 12시 54분을 기반으로 가장 단순한 내용을
            지향해요. 제가 무슨 말을 하는지 이해하지 못하도록 설명을
            최소화했어요.
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Title>간단한 기능설명</Title>
          <Description>
            엘리스 위키는 기본 12시 54분을 기반으로 가장 단순한 내용을
            지향해요. 제가 무슨 말을 하는지 이해하지 못하도록 설명을
            최소화했어요.
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Title>간단한 기능설명</Title>
          <Description>
            엘리스 위키는 기본 12시 54분을 기반으로 가장 단순한 내용을
            지향해요. 제가 무슨 말을 하는지 이해하지 못하도록 설명을
            최소화했어요.
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Title>간단한 기능설명</Title>
          <Description>
            엘리스 위키는 기본 12시 54분을 기반으로 가장 단순한 내용을
            지향해요. 제가 무슨 말을 하는지 이해하지 못하도록 설명을
            최소화했어요.
          </Description>
        </ContentWrapper>
      </InnerWrapper>
    </DescWrapper>
  );
};
