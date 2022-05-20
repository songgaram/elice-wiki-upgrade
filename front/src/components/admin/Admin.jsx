import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Admin = () => {
    const [selected, setSelected] = React.useState();
    const navigate = useNavigate();

    React.useEffect(() => {
        setSelected(window.location.pathname.split("/")[2]);
    }, [window.location.pathname]);
    const clickHandler = (e) => {
        navigate(e.target.name);
    };
    const userState = useSelector((state) => (state ? state.userReducer.user : undefined));
    const user = userState?.payload;

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <NavBar>
                <NavBtn onClick={clickHandler} name="users" color={selected === "users" ? "#c2c2c2" : "#e0e0e0"}>
                    유저관리
                </NavBtn>
                <NavBtn onClick={clickHandler} name="posts" color={selected === "posts" ? "#c2c2c2" : "#e0e0e0"}>
                    게시물관리
                </NavBtn>
                {user?.admin === 0 && (
                    <NavBtn onClick={clickHandler} name="questions" color={selected === "questions" ? "#c2c2c2" : "#e0e0e0"}>
                        인증질답관리
                    </NavBtn>
                )}
            </NavBar>
            <Container>
                <Outlet />
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
    width: 10rem;
    height: 3rem;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: ${(props) => props.color};
    &:hover {
        background-color: #c2c2c2;
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

export default Admin;
