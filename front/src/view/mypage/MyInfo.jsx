import React from "react";
import { Typography, Input, Button } from "@mui/material";
import eliceprofile from "assets/images/eliceprofile.png";
import { useEditUserInfo } from "queries/userQuery";
import styled from "styled-components";

const MyInfo = ({ user }) => {
    const [stashName, setStashName] = React.useState(null);
    const [name, setName] = React.useState(user.name);
    const [isWriting, setIsWriting] = React.useState(false);

    const editUserInfo = useEditUserInfo();

    const onClickHandler = () => {
        setStashName(name);
        setIsWriting(!isWriting);
    };
    const save = React.useCallback(async () => {
        editUserInfo.mutate(name);
        setIsWriting(!isWriting);
    });
    const onChangeHandler = (e) => {
        setName(e.target.value);
    };
    const keyUpHandler = (e) => {
        if (e.key === "Enter") {
            save();
        }
    };
    return (
        <div
            style={{
                display: "flex",
                marginBottom: "70px",
                justifyContent: "center",
                border: "1px solid #7353ea",
                width: "fit-content",
                borderRadius: "20px",
                overflow: "hidden",
            }}
        >
            <Image src={eliceprofile} alt="엘리스프로필" draggable="false" />
            <div
                style={{
                    width: "308px",
                    height: "350px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    src={user.profile_img}
                    alt="유저프로필"
                    draggable="false"
                    style={{ width: "110px", height: "110px", borderRadius: "50%" }}
                />
                <Typography sx={{ fontWeight: "bold", marginBottom: "20px", fontSize: "1.3rem" }}>
                    {user.email}
                </Typography>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography sx={{ fontWeight: "Bold" }}>이름</Typography>
                    {isWriting ? (
                        <Input
                            label="이름"
                            onChange={onChangeHandler}
                            value={name}
                            onKeyUp={keyUpHandler}
                            sx={{ height: "1.24rem", width: "8.5rem" }}
                        />
                    ) : (
                        <Typography sx={{ width: "8.5rem" }}>{name}</Typography>
                    )}
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "center",
                    }}
                >
                    <Typography sx={{ fontWeight: "Bold" }}>기수</Typography>
                    <Typography sx={{ width: "8.5rem" }}>엘리스 AI 트랙 {user.track}기</Typography>
                </div>
                {!isWriting && (
                    <Button variant="text" onClick={onClickHandler}>
                        수정
                    </Button>
                )}
                {isWriting && (
                    <div>
                        <Button
                            variant="text"
                            sx={{ color: "black" }}
                            onClick={() => {
                                setName(stashName);
                                setIsWriting(false);
                            }}
                        >
                            취소
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => {
                                save();
                            }}
                        >
                            저장
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Image = styled.img`
    height: 350px;
    @media screen and ${({ theme }) => theme.breakPoint} {
        display: none;
    }
`;

export default MyInfo;
