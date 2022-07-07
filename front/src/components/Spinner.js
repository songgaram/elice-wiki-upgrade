import CircularProgress from "@mui/material/CircularProgress";

export default function Spinner() {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CircularProgress />
        </div>
    );
}
