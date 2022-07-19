import React, { useState } from "react";
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import logo_large from "assets/images/logo_large.png";
import { useQueryClient } from "react-query";

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const menuId = "primary-search-account-menu";
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { userState } = queryClient.getQueryData("userState") || {};
    const { profile_img, admin } = userState?.payload;

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
            <Box sx={{ flexGrow: 1 }} style={{ width: "100%", height: "60px" }}>
                <AppBar position="static" style={{ backgroundColor: "white", boxShadow: "none" }}>
                    <Toolbar>
                        <img
                            alt="elice_logo"
                            src={logo_large}
                            style={{ width: 150, imageRendering: "auto", cursor: "pointer" }}
                            onClick={() => navigate("/home")}
                        />
                        <Box sx={{ flexGrow: 1 }} />

                        <IconButton
                            size="large"
                            edge="start"
                            onClick={handleSearchNavigate}
                            color="inherit"
                        >
                            <SearchIcon color="black" />
                        </IconButton>

                        <Button color="black" onClick={() => navigate("/board")}>
                            게시판
                        </Button>
                        <Button color="black" onClick={() => navigate("/addPost")}>
                            새 글 쓰기
                        </Button>

                        <Box sx={{ display: "flex" }}>
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
                                    style={{ width: "24px", height: "24px", borderRadius: "50%" }}
                                    alt="유저 프로필"
                                />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Menu anchorEl={anchorEl} id={menuId} open={isMenuOpen} onClose={handleMenuClose}>
                    <MenuItem onClick={handleClick}>My Page</MenuItem>
                    {(admin === 0 || admin === 1) && (
                        <MenuItem color="inherit" onClick={() => navigate("/admin")}>
                            Admin
                        </MenuItem>
                    )}
                    <hr />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Box>
        </>
    );
}

export default Header;
