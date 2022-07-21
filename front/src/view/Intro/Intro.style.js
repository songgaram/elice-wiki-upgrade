import styled from "styled-components";

const MainContainer = styled.div`
    width: 100%;
    height: auto;
`;

const SectionOne = styled.section`
    height: 800px;
    background-image: linear-gradient(
        109.6deg,
        rgba(245, 239, 249, 1) 30.1%,
        rgba(207, 211, 236, 1) 100.2%
    );
`;

const TextWarpper = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    padding: 0 3%;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const InnerWrapper = styled.div`
    padding-top: 7.5rem;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    h {
        width: 100%;
        text-align: center;
        margin-bottom: 2rem;
        font-size: 66px;
        font-weight: 700;
        line-height: 1.4;
        color: rgb(0, 0, 0);

        @media screen and ${({ theme }) => theme.breakPoint} {
            font-size: 55px;
        }
    }
`;

const BtnWrapper = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Description = styled.div`
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: center;
    margin-bottom: 3rem;
    color: #4a5056;
`;

const PrimaryBtn = styled.div`
    width: 230px;
    border-radius: 8px;
    margin-right: 10px;
    background-color: #7353ea;
    color: #fff;
    height: 55px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;

const SubSection = styled.div`
    position: relative;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 200px 3%;
    background: #f9fafb;
`;

const SubDescription = styled.p`
    font-size: 32px;
    font-weight: 700;
    line-height: 1.6;
    color: #000;
    text-align: center;

    span {
        background: linear-gradient(90deg, #5438d1, #8938d1 60%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const ScrollDownArrow = styled.div`
    margin-top: 7%;
    position: relative;

    span {
        position: absolute;
        top: 0;
        left: 50%;
        width: 24px;
        height: 24px;
        margin-left: -12px;
        border-left: 1px solid ${({ theme }) => theme.colors.primary};
        border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        -webkit-animation: sdb 2s infinite;
        animation: sdb 2s infinite;
        opacity: 0;
        box-sizing: border-box;
    }

    span:nth-of-type(1) {
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
    }
    span:nth-of-type(2) {
        top: 16px;
        -webkit-animation-delay: 0.15s;
        animation-delay: 0.15s;
    }
    span:nth-of-type(3) {
        top: 32px;
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
    }
    @-webkit-keyframes sdb {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes sdb {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;

export {
    MainContainer,
    SectionOne,
    TextWarpper,
    InnerWrapper,
    BtnWrapper,
    Description,
    PrimaryBtn,
    SubSection,
    SubDescription,
    ScrollDownArrow,
};
