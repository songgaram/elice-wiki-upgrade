import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";

const Admin = () => {
  const navigate = useNavigate();
  const clickHandler = (e) => {
    navigate(e.target.name);
  };
  const controller = (e) => {
    console.log(e.target.name);
  };
  return (
    <Container>
      <NavBar>
        <div>
          <NavBtn onClick={clickHandler} name="users">
            유저관리
          </NavBtn>
          <NavBtn onClick={clickHandler} name="posts">
            게시물관리
          </NavBtn>
          <NavBtn onClick={clickHandler} name="questions">
            인증질답관리
          </NavBtn>
        </div>
        <div>
          <Controller onClick={controller} name="deleteUser">
            유저삭제
          </Controller>
          <Controller onClick={controller} name="giveAdmin">
            어드민 권한부여
          </Controller>
          <Controller onClick={controller} name="auth">
            인가
          </Controller>
        </div>
      </NavBar>
      <Container>
        <Outlet />
      </Container>
    </Container>
  );
};

const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
  border: 1px solid red;
`;
const NavBtn = styled.button`
  border: 1px solid blue;
`;
const Controller = styled.button`
  border: 1px solid yellow;
`;
const Container = styled.div`
  width: 80vw;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

export default Admin;
