import { useNavigate } from "react-router";
import {
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Typography,
    IconButton,
    Button,
} from "@mui/material/";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useDeleteBoard } from "queries/boardQuery";

function BoardContents({ setIsEditing, isEditable, boardData }) {
    const navigate = useNavigate();
    const { title, body, createdAt, userName, header, boardId } = boardData;

    const deleteBoard = useDeleteBoard(boardId);

    const handleDelete = async () => {
        if (window.confirm("게시글을 삭제하실 건가요?")) {
            deleteBoard.mutate();
            navigate("/board");
        }
    };
    return (
        <>
            <Card sx={{ minWidth: 275 }} variant="outlined">
                <CardHeader
                    action={
                        <Button size="small" onClick={() => navigate("/board")}>
                            목록
                        </Button>
                    }
                    title={`[${header}] ${title}`}
                    subheader={`${userName} | ${createdAt.slice(0, 10)}`}
                />
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                        {body}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    {isEditable && (
                        <>
                            <IconButton
                                onClick={() => setIsEditing(true)}
                                sx={{ marginLeft: "auto" }}
                            >
                                <AiTwotoneEdit />
                            </IconButton>
                            <IconButton onClick={() => handleDelete()}>
                                <AiFillDelete />
                            </IconButton>
                        </>
                    )}
                </CardActions>
            </Card>
        </>
    );
}

export default BoardContents;
