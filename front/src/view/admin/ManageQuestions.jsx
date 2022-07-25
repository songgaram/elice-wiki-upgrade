import React from "react";
import Api from "libs/api";
import styled from "styled-components";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button, Pagination, Stack, Checkbox } from "@mui/material";

import { useGetAuthData, useDelAuthQuestion, usePutAuthQuestion } from "queries/authQuery";

const ManageUsers = () => {
    const [checkedList, setCheckedList] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const navigate = useNavigate();
    const height = useOutletContext();
    const perPage = Math.floor(height / 64.2) - 1 || 8;

    const delAuthQuestion = useDelAuthQuestion();
    const putAuthQuestion = usePutAuthQuestion();

    const { data } = useGetAuthData(page, perPage);
    const authData = data?.payload?.rows;
    const totalPage = Math.ceil(data?.payload?.count / perPage);

    const pageHandler = (event, value) => {
        setPage(value);
    };

    const checkAll = (e) => {
        if (e.target.checked) {
            const idList = authData.map((datum) => datum.id);
            setCheckedList(idList);
        } else {
            setCheckedList([]);
        }
    };
    const checkHandler = (e) => {
        if (e.target.checked) {
            const newCheckedList = [...checkedList, parseInt(e.target.value)];
            setCheckedList(newCheckedList);
        } else {
            const newCheckedList = checkedList.filter((id) => id !== parseInt(e.target.value));
            setCheckedList(newCheckedList);
        }
    };
    const controller = async (e) => {
        const checkedIdString = checkedList.join(",");
        if (e.target.name === "deleteQuestion") {
            delAuthQuestion.mutate(checkedIdString);
            alert(`질문을 삭제하였습니다.`);
        } else if (e.target.name === "setCurrentQuestion") {
            if (checkedList.length > 1) {
                alert("현재 질문은 1개만 설정할 수 있습니다.");
            } else {
                const CURRENT_DATA = { current: true };
                putAuthQuestion.mutate(checkedList[0], CURRENT_DATA);
                alert(`Id: ${checkedList[0]}를 현재 질문으로 설정하였습니다.`);
            }
        } else if (e.target.name === "createNewQuestion") {
            navigate("/editquestion/new");
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
                    <Button variant="outlined" onClick={controller} name="setCurrentQuestion">
                        현재 질문으로 설정
                    </Button>
                    <Button variant="outlined" onClick={controller} name="createNewQuestion">
                        새로만들기
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={controller}
                        name="deleteQuestion"
                        color="error"
                    >
                        제거하기
                    </Button>
                </ControllerContainer>
                <Table>
                    <Thead>
                        <Tr color="#C2C2C2">
                            <Th style={{ width: "3%" }}>
                                <Checkbox id="checkAll" onChange={checkAll} />
                            </Th>
                            <Th style={{ width: "3%" }}>No.</Th>
                            <Th style={{ width: "70%" }}>Question</Th>
                            <Th style={{ width: "14%" }}>Answer</Th>
                            <Th style={{ width: "10%" }}>Current</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {authData &&
                            authData.map((datum, index) => {
                                return (
                                    <Tr
                                        key={`users/${index}`}
                                        color={checkedList.includes(datum.id) ? "#e0e0e0" : "white"}
                                    >
                                        <Td style={{ width: "3%" }}>
                                            <Checkbox
                                                value={datum.id}
                                                onClick={checkHandler}
                                                checked={
                                                    checkedList.includes(datum.id) ? true : false
                                                }
                                            />
                                        </Td>
                                        <Td style={{ width: "3%" }}>{datum.id}</Td>
                                        <Td style={{ width: "70%" }}>
                                            <Title
                                                onClick={() => {
                                                    navigate(`/editquestion/${datum.id}`);
                                                }}
                                            >
                                                {datum.question}
                                            </Title>
                                        </Td>
                                        <Td style={{ width: "14%" }}>{datum.answer}</Td>
                                        <Td style={{ width: "10%" }}>{String(datum.current)}</Td>
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
export default ManageUsers;
