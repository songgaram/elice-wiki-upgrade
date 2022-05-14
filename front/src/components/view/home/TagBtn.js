import { Button } from "@mui/material";

export default function TagBtn() {
    const tagData = ["html", "css", "javascript"];

    return (
        <>
            {tagData.map((tag) => (
                <Button
                    variant="outlined"
                    sx={{
                        fontSize: "0.5rem",
                        borderRadius: "100px",
                        m: "5px",
                    }}
                    key={tag}
                >
                    {tag}
                </Button>
            ))}
        </>
    );
}
