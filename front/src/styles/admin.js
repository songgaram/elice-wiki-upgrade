import styled from "styled-components";

const Header = styled.header`
    height: 60px;
    display: flex;
    background-color: #d3d3d3;
    align-items: center;
    justify-content: space-between;
`;

const H1 = styled.h1`
    margin-left: 20px;
    font-size: 30px;
`;

const Small = styled.small`
    color: gray;
    font-weight: 400;
    line-height: 30px;
    font-size: 18px;
`;

const HeaderNav = styled.nav`
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    margin-right: 20px;
`;

const Nav = styled.nav`
    width: 240px;
    height: 1000px;
    position: fixed;
    border-right: solid 1px black;
`;

const Body = styled.div`
    margin-left: 240px;
`;

export { Header, H1, Small, HeaderNav, Nav, Body };
