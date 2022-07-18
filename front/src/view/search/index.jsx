import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
    return (
        <SearchContainer>
            <InputBox>
                <StyledInput
                    type="text"
                    name="search"
                    placeholder="검색어를 입력해주세요."
                    // value={searchWord}
                    // onChange={onChangeHandle}
                    autoComplete="off"
                />
                <span type="submit">
                    <SearchIcon fontSize="large" />
                </span>
            </InputBox>
        </SearchContainer>
    );
}

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
`;

const InputBox = styled.div`
    position: relative;

    input {
        font-size: 16px;
    }

    span {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 20px;
        cursor: pointer;
    }
`;

const StyledInput = styled.input`
    width: 600px;
    height: 60px;
    padding: 0 20px;
    letter-spacing: 0.5px;
    border-radius: 10px;
    border: 1.5px solid ${({ theme }) => theme.colors.block};
    outline: none;
    font-size: 16px;

    &:focus {
        border: 1.5px solid ${({ theme }) => theme.colors.primary};
    }
`;

export default Search;
