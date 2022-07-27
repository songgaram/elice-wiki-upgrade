import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
    List,
    ListSubheader,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Stack,
    Pagination,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Spinner from "components/Spinner";
import styled from "styled-components";

import { useMediaQuery } from "react-responsive";
import { useTheme } from "styled-components";

import { useGetBoardList } from "queries/boardQuery";

function Board() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const perPage = 8;
    const { data, status } = useGetBoardList(page, perPage);
    const boardList = data?.payload?.boardList;
    const totalPage = data?.payload?.totalPage;

    const handlePage = (e, value) => {
        setPage(value);
    };

    const theme = useTheme();
    const mediaQuery = useMediaQuery({ query: theme.breakPoint });

    if (status === "loading") return <Spinner />;

    return (
        <>
            {!mediaQuery ? (
                <Container>
                    <Box
                        sx={{
                            minWidth: "70%",
                            height: "auto",
                            margin: "1% 0 2% 0",
                        }}
                    >
                        <List
                            sx={{
                                width: "100%",
                                bgcolor: "background.paper",
                            }}
                            aria-labelledby="nested-list-subheader"
                        >
                            <ListSubheader
                                component="div"
                                id="nested-list-subheader"
                                style={{
                                    textAlign: "center",
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: "700" }}>
                                    자유게시판
                                </span>
                                <IconButton onClick={() => navigate("/board/create")}>
                                    <BorderColorIcon />
                                </IconButton>
                            </ListSubheader>
                        </List>
                        <TableContainer component={Paper} variant="outlined">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#f2eefc" }}>
                                        <TableCell style={{ width: "10%" }}>번호</TableCell>

                                        <TableCell style={{ width: "60%" }} align="center">
                                            제목
                                        </TableCell>
                                        <TableCell style={{ width: "15%" }} align="center">
                                            작성자
                                        </TableCell>
                                        <TableCell style={{ width: "15%" }} align="right">
                                            날짜
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {boardList?.map((board) => (
                                        <TableRow
                                            key={board.id}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                            onClick={() => navigate(`/board/${board.boardId}`)}
                                            style={{ cursor: "pointer" }}
                                            hover={true}
                                        >
                                            <TableCell
                                                style={{ width: "10%" }}
                                                component="th"
                                                scope="row"
                                            >
                                                {board.id}
                                            </TableCell>

                                            <TableCell style={{ width: "60%" }} align="left">
                                                <span style={{ fontWeight: "bold" }}>
                                                    [{board.header}]
                                                </span>{" "}
                                                {board.title}
                                            </TableCell>
                                            <TableCell style={{ width: "15%" }} align="center">
                                                {board.userName}
                                            </TableCell>
                                            <TableCell style={{ width: "15%" }} align="right">
                                                {board.createdAt.slice(0, 10)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {totalPage && (
                        <Stack spacing={2} style={{ position: "fixed", top: "85%" }}>
                            <Pagination
                                count={totalPage}
                                page={page}
                                onChange={handlePage}
                                color="primary"
                            />
                        </Stack>
                    )}
                </Container>
            ) : (
                <Container>
                    <div
                        style={{
                            margin: "1% 0 2% 0",
                        }}
                    >
                        <Header>
                            <span>자유게시판</span>
                            <IconButton onClick={() => navigate("/board/create")}>
                                <BorderColorIcon />
                            </IconButton>
                        </Header>
                        <TableContainer component={Paper} variant="outlined">
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: theme.colors.gray01 }}>
                                        <TableCell style={{ width: "85%" }} align="left">
                                            제목
                                        </TableCell>
                                        <TableCell
                                            style={{ width: "15%", whiteSpace: "nowrap" }}
                                            align="right"
                                        >
                                            작성자
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {boardList?.map((board) => (
                                        <TableRow
                                            key={board.id}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                            onClick={() => navigate(`/board/${board.boardId}`)}
                                            style={{ cursor: "pointer" }}
                                            hover={true}
                                        >
                                            <TableCell style={{ width: "85%" }} align="left">
                                                <span style={{ fontWeight: "bold" }}>
                                                    [{board.header}]
                                                </span>{" "}
                                                {board.title}
                                            </TableCell>
                                            <TableCell style={{ width: "15%" }} align="center">
                                                {board.userName}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    {totalPage && (
                        <Stack spacing={2} style={{ position: "fixed", top: "92%" }}>
                            <Pagination
                                count={totalPage}
                                page={page}
                                onChange={handlePage}
                                color="primary"
                            />
                        </Stack>
                    )}
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    span {
        color: ${({ theme }) => theme.colors.gray03};
        font-size: 1rem;
        font-weight: 700;
    }
`;

export default Board;
