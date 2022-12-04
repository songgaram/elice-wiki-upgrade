import { useParams } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WeekNav = () => {
    const navigate = useNavigate();
    const params = useParams();
    const week = Number(params.week);

    const handleClick = (e) => {
        const week = Number(e.target.value) + 1;
        navigate(`week/${week}`);
    };

    return (
        <>
            <NavContainer>
                <Button disabled style={{ color: "black", fontWeight: "bold" }}>
                    WEEK
                </Button>

                {new Array(24).fill(null).map((_, idx) => (
                    <>
                        <Button
                            value={idx}
                            key={`week_${idx}`}
                            size="small"
                            variant={week === idx + 1 ? "contained" : "text"}
                            sx={{
                                minWidth: "35px",
                                height: "20px",
                                borderRadius: "30px",
                                margin: "0 3px",
                            }}
                            onClick={handleClick}
                        >
                            {String(idx + 1).padStart(2, "0")}
                        </Button>
                        <Divider
                            key={`divider_${idx}`}
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            style={idx === 23 ? { display: "none" } : { display: "inline" }}
                        />
                    </>
                ))}
            </NavContainer>
        </>
    );
};

const NavContainer = styled.div`
    width: 100%;
    height: 40px;
    padding: 0 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
    border-top: 5px solid #7353ea;

    @media screen and ${({ theme }) => theme.breakPoint} {
        justify-content: unset;
        overflow: auto;
        white-space: nowrap;

        ::-webkit-scrollbar {
            display: none;
        }
    }
`;

export default WeekNav;
