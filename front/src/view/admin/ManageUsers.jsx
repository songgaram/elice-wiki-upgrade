import React from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { Button, Pagination, Stack, Checkbox } from "@mui/material";
import { useQueryClient } from "react-query";

import { useGetUserList, useEditUsers, useDeleteUsers } from "queries/userQuery";

const ManageUsers = () => {
    const editUsers = useEditUsers();
    const deleteUsers = useDeleteUsers();

    const [checkedList, setCheckedList] = React.useState([]);
    const [page, setPage] = React.useState(1);

    const height = useOutletContext();
    const perPage = Math.floor(height / 64.2) - 1 || 8;

    const queryClient = useQueryClient();
    const { userState } = queryClient.getQueryData("userState");
    const admin = userState?.payload?.admin;

    const res = useGetUserList(page, perPage);
    const data = res?.data?.userListInfo;
    const totalPage = res?.data?.totalPage;

    const checkAll = (e) => {
        if (e.target.checked) {
            const idList = data.map((datum) => datum.__id);
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
            const newCheckedList = checkedList.filter((__id) => __id !== e.target.value);
            setCheckedList(newCheckedList);
        }
    };
    const pageHandler = (event, value) => {
        setPage(value);
    };
    const controller = async (e) => {
        const checkedIdString = checkedList.join(",");
        if (e.target.name === "deleteUser") {
            deleteUsers.mutate(checkedIdString);
            alert(`${checkedList.length}명의 유저가 탈퇴되었습니다.`);
        } else if (e.target.name === "giveAdmin") {
            const PUT_DATA = { userId: checkedIdString, data: { admin: 1 } };
            editUsers.mutate(PUT_DATA);
            alert(`${checkedList.length}명의 유저에게 어드민 권한을 부여했습니다.`);
        } else if (e.target.name === "takeAdmin") {
            const PUT_DATA = { userId: checkedIdString, data: { admin: 2 } };
            editUsers.mutate(PUT_DATA);
            alert(`${checkedList.length}명의 유저의 어드민 권한을 박탈했습니다.`);
        } else if (e.target.name === "auth") {
            const PUT_DATA = { userId: checkedIdString, data: { authorized: true } };
            editUsers.mutate(PUT_DATA);
            alert(`${checkedList.length}명의 유저가 인증되었습니다.`);
        } else if (e.target.name === "cancleAuth") {
            const PUT_DATA = { userId: checkedIdString, data: { authorized: false } };
            editUsers.mutate(PUT_DATA);
            alert(`${checkedList.length}명의 유저의 인증을 취소하였습니다.`);
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
                    <Button variant="outlined" onClick={controller} name="deleteUser" color="error">
                        유저삭제
                    </Button>
                    <Button variant="outlined" onClick={controller} name="auth">
                        인증
                    </Button>
                    <Button variant="outlined" onClick={controller} name="cancleAuth">
                        인증해제
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={controller}
                        name="giveAdmin"
                        disabled={admin === 0 ? false : true}
                    >
                        어드민 권한부여
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={controller}
                        name="takeAdmin"
                        disabled={admin === 0 ? false : true}
                    >
                        어드민 권한박탈
                    </Button>
                </ControllerContainer>
                <Table>
                    <Thead>
                        <Tr color="#C2C2C2">
                            <Th style={{ width: "3%" }}>
                                <Checkbox id="checkAll" onChange={checkAll} />
                            </Th>
                            <Th style={{ width: "34%" }}>UserId</Th>
                            <Th style={{ width: "5%" }}>Image</Th>
                            <Th style={{ width: "16%" }}>Name</Th>
                            <Th style={{ width: "20%" }}>Email</Th>
                            <Th style={{ width: "6%" }}>Track</Th>
                            <Th style={{ width: "10%" }}>Authorized</Th>
                            <Th style={{ width: "6%" }}>Admin</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data &&
                            data.map((datum, index) => {
                                return (
                                    <Tr
                                        key={`users/${index}`}
                                        color={
                                            checkedList.includes(datum.__id) ? "#e0e0e0" : "white"
                                        }
                                    >
                                        <Td style={{ width: "3%" }}>
                                            <Checkbox
                                                value={datum.__id}
                                                onChange={checkHandler}
                                                checked={
                                                    checkedList.includes(datum.__id) ? true : false
                                                }
                                            />
                                        </Td>
                                        <Td style={{ width: "34%" }}>{datum.__id}</Td>
                                        <Td style={{ width: "5%" }}>
                                            <img
                                                alt="user profile"
                                                src={datum.profile_img}
                                                style={{ height: "100%" }}
                                                onDoubleClick={() => {
                                                    window.open(datum.profile_img);
                                                }}
                                            />
                                        </Td>
                                        <Td style={{ width: "16%" }}>{datum.name}</Td>
                                        <Td style={{ color: "#7353EA", width: "20%" }}>
                                            {datum.email}
                                        </Td>
                                        <Td style={{ width: "6%" }}>{datum.track}</Td>
                                        <Td style={{ width: "10%" }}>{String(datum.authorized)}</Td>
                                        <Td style={{ width: "6%" }}>{datum.admin}</Td>
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
export default ManageUsers;
