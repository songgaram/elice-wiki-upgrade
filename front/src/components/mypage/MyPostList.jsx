import React from "react";
import { Create, LibraryBooks, ChatBubble } from "@mui/icons-material";
import * as Api from "../../api";

const MyPostList = ({ user }) => {
    const getUserPostList = React.UseCallback(async () => {
        const { data } = {};
    });
    return (
        <div style={{ backgroundColor: "skyblue", width: "60vw" }}>
            <div>
                <Create />
            </div>
            <div style={{ borderTop: "1px solid gray" }}>
                <LibraryBooks />
            </div>
            <div style={{ borderTop: "1px solid gray" }}>
                <ChatBubble />
            </div>
        </div>
    );
};
export default MyPostList;
