import React, { useState } from "react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { HeaderWrapper, HeaderContainer, NavList } from "./header.style";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import logo_large from "assets/images/logo_large.png";
import { useQueryClient } from "react-query";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "styled-components";

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const menuId = "primary-search-account-menu";
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { userState } = queryClient.getQueryData("userState") || {};
    const { profile_img, admin } = userState?.payload;

    const theme = useTheme();
    const mediaQuery = useMediaQuery({ query: theme.breakPoint });

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSearchNavigate = () => {
        navigate("/search");
    };

    const handleLogout = () => {
        // userToken 삭제 후 userState update
        sessionStorage.removeItem("userToken");
        queryClient.invalidateQueries("userState");

        // 기본 페이지로 돌아감.
        navigate("/");
    };

    const handleClick = () => {
        navigate("/mypage");
    };

    return (
        <>
            {!mediaQuery ? (
                <HeaderContainer>
                    <HeaderWrapper>
                        <img
                            alt="elice_logo"
                            src={logo_large}
                            style={{ width: 150, imageRendering: "auto", cursor: "pointer" }}
                            onClick={() => navigate("/home")}
                        />
                        <NavList>
                            <IconButton
                                size="large"
                                edge="start"
                                onClick={handleSearchNavigate}
                                color="inherit"
                            >
                                <BiSearchAlt2 />
                            </IconButton>

                            <Button color="black" onClick={() => navigate("/board")}>
                                게시판
                            </Button>
                            <Button color="black" onClick={() => navigate("/addPost")}>
                                새 글 쓰기
                            </Button>

                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <img
                                    src={profile_img}
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        borderRadius: "50%",
                                    }}
                                    alt="유저 프로필"
                                />
                            </IconButton>
                        </NavList>
                    </HeaderWrapper>
                    <Menu
                        anchorEl={anchorEl}
                        id={menuId}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleClick}>마이페이지</MenuItem>
                        {(admin === 0 || admin === 1) && (
                            <MenuItem color="inherit" onClick={() => navigate("/admin")}>
                                Admin
                            </MenuItem>
                        )}
                        <hr />
                        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                    </Menu>
                </HeaderContainer>
            ) : (
                <HeaderContainer>
                    <HeaderWrapper>
                        <img
                            alt="elice_logo"
                            src={logo_large}
                            style={{ width: 150, imageRendering: "auto", cursor: "pointer" }}
                            onClick={() => navigate("/home")}
                        />
                        <NavList>
                            <IconButton
                                size="large"
                                edge="end"
                                onClick={handleSearchNavigate}
                                color="inherit"
                            >
                                <BiSearchAlt2 />
                            </IconButton>

                            <IconButton
                                size="large"
                                edge="end"
                                aria-controls={menuId}
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <img
                                    src={profile_img}
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        borderRadius: "50%",
                                    }}
                                    alt="유저 프로필"
                                />
                            </IconButton>
                        </NavList>
                    </HeaderWrapper>
                    <Menu
                        anchorEl={anchorEl}
                        id={menuId}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                    >
                        <MenuItem onClick={() => navigate("/addPost")}>새 글 쓰기</MenuItem>
                        <MenuItem onClick={() => navigate("/board")}>게시판</MenuItem>
                        <MenuItem onClick={handleClick}>마이페이지</MenuItem>
                        {(admin === 0 || admin === 1) && (
                            <MenuItem color="inherit" onClick={() => navigate("/admin")}>
                                Admin
                            </MenuItem>
                        )}
                        <hr />
                        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                    </Menu>
                </HeaderContainer>
            )}
        </>
    );
}

export default Header;
