import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "@mui/material";
import logo_small from "assets/images/logo_small.png";
import { useQueryClient } from "react-query";

const Admin = () => {
    const [selected, setSelected] = React.useState();
    const [height, setHeight] = React.useState();
    const navigate = useNavigate();
    const elementRef = React.useRef(null);
    React.useEffect(() => {
        setSelected(window.location.pathname.split("/")[2]);
    }, [window.location.pathname]);
    React.useEffect(() => {
        setHeight(elementRef.current?.clientHeight);
    }, [elementRef]);
    const clickHandler = (e) => {
        navigate(e.target.name);
    };
    const queryClient = useQueryClient();
    const { userState } = queryClient.getQueryData("userState");
    const admin = userState?.payload?.admin;

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <LogoHome
                src={logo_small}
                alt="TOHOME"
                onClick={() => {
                    navigate("/home");
                }}
                draggable="false"
            />
            <NavBar>
                <NavBtn
                    onClick={clickHandler}
                    name="users"
                    color={selected === "users" ? "#c2c2c2" : "#e0e0e0"}
                >
                    유저관리
                </NavBtn>
                <NavBtn
                    onClick={clickHandler}
                    name="posts"
                    color={selected === "posts" ? "#c2c2c2" : "#e0e0e0"}
                >
                    포스트관리
                </NavBtn>
                <NavBtn
                    onClick={clickHandler}
                    name="board"
                    color={selected === "board" ? "#c2c2c2" : "#e0e0e0"}
                >
                    게시판관리
                </NavBtn>
                <NavBtn
                    onClick={clickHandler}
                    name="questions"
                    color={selected === "questions" ? "#c2c2c2" : "#e0e0e0"}
                    disabled={admin === 0 ? false : true}
                >
                    인증질답관리
                </NavBtn>
            </NavBar>
            <Container ref={elementRef}>
                {window.location.pathname === "/admin" ? (
                    <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                        이곳은 어드민 페이지 입니다.
                    </Typography>
                ) : (
                    <Outlet context={height} />
                )}
            </Container>
        </div>
    );
};

const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
`;
const NavBtn = styled.button`
    border: none;
    border-radius: 10px 10px 0 0;
    width: 8rem;
    height: 3rem;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: ${(props) => (props.disabled === true ? "default" : "pointer")};
    background-color: ${(props) => props.color};
    &:hover {
        background-color: ${(props) => (props.disabled === true ? "none" : "#c2c2c2")};
    }
`;
const Container = styled.div`
    width: 80vw;
    height: 80vh;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
`;
const LogoHome = styled.img`
    -webkit-user-select: none;
    cursor: pointer;
    width: 50px;
    position: relative;
    margin: 10px 0 10px 0;
    &:hover {
        opacity: 0.6;
    }
`;

export default Admin;
