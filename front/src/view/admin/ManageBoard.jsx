import React from "react";
import Api from "libs/api";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button, Pagination, Stack, Popover, Typography, Checkbox } from "@mui/material";

const ManageUsers = () => {
    const [data, setData] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [checkedList, setCheckedList] = React.useState([]);
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(null);
    const height = useOutletContext();
    const perPage = Math.floor(height / 64.2) - 1 || 8;

    const handleClick = (event) => {
        const userId = event.currentTarget.innerText;
        getUser(userId);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const getUser = React.useCallback(async (userId) => {
        try {
            const { data } = await Api.get("users", userId);
            setUser(data.payload);
        } catch (e) {
            setUser(null);
            console.log(e);
        }
    });

    const getData = React.useCallback(async () => {
        try {
            const { data } = await Api.getQuery(
                "boardlist/pageinfo",
                `page=${page}&perPage=${perPage}`,
            );
            setData(data.payload?.boardList);
            setTotalPage(data.payload?.totalPage);
        } catch (e) {
            console.log(e);
        }
    });

    React.useEffect(() => {
        getData();
    }, [page]);

    const checkAll = (e) => {
        if (e.target.checked) {
            const idList = data.map((datum) => datum.boardId);
            setCheckedList(idList);
        } else {
            setCheckedList([]);
        }
    };
    const checkHandler = (e) => {
        if (e.target.checked) {
            const newCheckedList = [...checkedList, e.target.value];
            setCheckedList(newCheckedList);
        } else {
            const newCheckedList = checkedList.filter((id) => id !== e.target.value);
            setCheckedList(newCheckedList);
        }
    };
    const pageHandler = (event, value) => {
        setPage(value);
    };
    const controller = async (e) => {
        const checkedIdString = checkedList.join(",");
        if (e.target.name === "deletePost") {
            const { data } = await Api.delete("posts", checkedIdString);
            alert(`${data.payload.success}개의 게시글이 삭제되었습니다.`);
            getData();
        }
        setCheckedList([]);
        document.getElementById("checkAll").checked = false;
    };
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div style={{ width: "100%", height: "100%" }}>
                <ControllerContainer>
                    <Button variant="outlined" onClick={controller} name="deletePost" color="error">
                        삭제하기
                    </Button>
                </ControllerContainer>
                <Table>
                    <Thead>
                        <Tr color="#C2C2C2">
                            <Th style={{ width: "3%" }}>
                                <Checkbox id="checkAll" onChange={checkAll} />
                            </Th>
                            <Th style={{ width: "3%" }}>No.</Th>
                            <Th style={{ width: "34%" }}>BoardId</Th>
                            <Th style={{ width: "13%" }}>Title</Th>
                            <Th style={{ width: "34%" }}>작성자</Th>
                            <Th style={{ width: "13%" }}>작성시간</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data &&
                            data.map((datum, index) => {
                                return (
                                    <Tr
                                        key={`users/${index}`}
                                        color={
                                            checkedList.includes(datum.boardId)
                                                ? "#e0e0e0"
                                                : "white"
                                        }
                                    >
                                        <Td style={{ width: "3%" }}>
                                            <Checkbox
                                                value={datum.boardId}
                                                onClick={checkHandler}
                                                checked={
                                                    checkedList.includes(datum.boardId)
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </Td>
                                        <Td style={{ width: "3%" }}>{datum.id}</Td>
                                        <Td style={{ width: "34%" }}>{datum.boardId}</Td>
                                        <Td style={{ width: "13%" }}>
                                            <Title
                                                onClick={() => {
                                                    navigate(`/board/${datum.boardId}`);
                                                }}
                                            >
                                                {datum.title}
                                            </Title>
                                        </Td>
                                        <Td style={{ width: "34%" }}>
                                            <UserId aria-describedby={id} onClick={handleClick}>
                                                {datum.userId}
                                            </UserId>
                                        </Td>
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                            }}
                                        >
                                            {user ? (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        padding: "15px",
                                                    }}
                                                >
                                                    <img
                                                        src={user.profile_img}
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{ p: 0, alignSelf: "flex-start" }}
                                                    >
                                                        <span style={{ fontWeight: "bold" }}>
                                                            Name
                                                        </span>
                                                        {`: ${user.name}`}
                                                    </Typography>
                                                    <Typography
                                                        sx={{ p: 0, alignSelf: "flex-start" }}
                                                    >
                                                        <span style={{ fontWeight: "bold" }}>
                                                            Email
                                                        </span>
                                                        {`: ${user.email}`}
                                                    </Typography>
                                                    <Typography
                                                        sx={{ p: 0, alignSelf: "flex-start" }}
                                                    >
                                                        <span style={{ fontWeight: "bold" }}>
                                                            Track
                                                        </span>
                                                        {`: ${user.track}`}
                                                    </Typography>
                                                    <Typography
                                                        sx={{ p: 0, alignSelf: "flex-start" }}
                                                    >
                                                        <span style={{ fontWeight: "bold" }}>
                                                            Admin
                                                        </span>
                                                        {`: ${user.admin}`}
                                                    </Typography>
                                                    <Typography
                                                        sx={{ p: 0, alignSelf: "flex-start" }}
                                                    >
                                                        <span style={{ fontWeight: "bold" }}>
                                                            Authorized
                                                        </span>
                                                        {`: ${user.authorized}`}
                                                    </Typography>
                                                </div>
                                            ) : (
                                                <Typography sx={{ p: 2 }}>
                                                    해당하는 유저가 없습니다.
                                                </Typography>
                                            )}
                                        </Popover>
                                        <Td style={{ width: "13%" }}>
                                            {moment(moment.utc(datum.createdAt).toDate()).format(
                                                "llll",
                                            )}
                                        </Td>
                                    </Tr>
                                );
                            })}
                    </Tbody>
                </Table>
            </div>
            {totalPage && (
                <Stack spacing={2}>
                    <Pagination
                        count={totalPage}
                        page={page}
                        onChange={pageHandler}
                        color="primary"
                    />
                </Stack>
            )}
        </div>
    );
};
const Table = styled.table`
    width: 100%;
`;
const Th = styled.th`
    height: 2.5rem;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: bold;
    font-size: 1.4rem;
    vertical-align: middle;
`;
const Td = styled.td`
    height: 2.5rem;
    padding: 10px;
    font-size: 1.2rem;
    vertical-align: middle;
    text-align: center;
`;
const Tr = styled.tr`
    background-color: ${(props) => props.color};
`;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
const ControllerContainer = styled.div`
    position: absolute;
    right: 10vw;
    width: fit-content;
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 15px;
    margin-top: -45px;
    padding-right: 10px;
`;
const Title = styled.a`
    text-decoration: underline;
    color: #7353ea;
    cursor: pointer;
    &:hover {
        color: gray;
    }
`;
const UserId = styled.a`
    &:hover {
        opacity: 0.5;
    }
`;
export default ManageUsers;
