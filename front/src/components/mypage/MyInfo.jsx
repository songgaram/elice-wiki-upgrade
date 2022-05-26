import React from "react";
import { Typography, TextField } from "@mui/material";
import * as Api from "../../api";

const MyInfo = ({ user }) => {
    const [name, setName] = React.useState(user.name);
    const [isWriting, setIsWriting] = React.useState(false);
    const onClickHandler = () => {
        setIsWriting(!isWriting);
    };
    const save = React.useCallback(async () => {
        await Api.put("user/current", { name });
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
        <div style={{ display: "flex", justifyContent: "center", border: "1px solid #7353ea", width: "fit-content" }}>
            <img src="/image/eliceprofile.png" style={{ height: "250px" }} />
            <div
                style={{
                    width: "fit-content",
                    width: "220px",
                    height: "250px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img src={user.profile_img} style={{ width: "75px", height: "75px", borderRadius: "50%" }} />
                <Typography sx={{ fontWeight: "bold", marginBottom: "20px" }}>{user.email}</Typography>
                <div style={{ display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: "Bold" }}>이름</Typography>
                    {isWriting ? <TextField label="이름" onChange={onChangeHandler} value={name} onKeyUp={keyUpHandler} /> : <Typography>{name}</Typography>}
                    {!isWriting && (
                        <Typography color="primary" sx={{ fontWeight: "bold", fontSize: "0.8rem" }} onClick={onClickHandler} id="name">
                            수정
                        </Typography>
                    )}
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <Typography sx={{ fontWeight: "Bold" }}>기수</Typography>
                    <Typography>엘리스 AI 트랙 {user.track}기</Typography>
                </div>
                {isWriting && (
                    <button
                        onClick={() => {
                            save();
                        }}
                    >
                        저장
                    </button>
                )}
            </div>
        </div>
    );
};
export default MyInfo;
