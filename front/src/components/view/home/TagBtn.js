import { Button } from "@mui/material";

export default function TagBtn({ tag }) {
    const tagData = tag.split("#").slice(1);

    console.log(tagData);
    return (
        <>
            {tagData.map((tag) => (
                <Button
                    variant="outlined"
                    sx={{
                        fontSize: "0.5rem",
                        borderRadius: "100px",
                        m: "5px 3px",
                    }}
                    key={tag}
                >
                    {tag}
                </Button>
            ))}
        </>
    );
}
