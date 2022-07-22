import styled from "styled-components";

const HeaderContainer = styled.div`
    width: 100%;
    height: 70px;
    background: ${({ theme }) => theme.colors.white};

    img {
        cursor: pointer;
    }
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    margin: 0 auto;
`;

const NavList = styled.div`
    display: flex;
    align-items: center;
`;

export { HeaderContainer, HeaderWrapper, NavList };
