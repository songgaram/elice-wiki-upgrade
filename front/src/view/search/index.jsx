import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useGetWholePostList } from "queries/postQuery";
import { postList, filteredSearchList } from "./state";
import useDebounce from "./useDebounce";
import SearchResult from "./SearchResult";

function Search() {
    const { data } = useGetWholePostList();
    const POST_DATA = data?.payload?.postListInfo;

    const [searchWord, setSearchWord] = useState("");
    const [, setPostList] = useRecoilState(postList);

    const filteredList = useRecoilValue(filteredSearchList);

    useEffect(() => {
        setPostList(POST_DATA);
    }, [POST_DATA, setPostList]);

    const onChangeHandle = (e) => {
        const item = e.target.value;
        setSearchWord(item);
    };

    useDebounce(searchWord, 500);

    return (
        <SearchContainer>
            <InputBox>
                <StyledInput
                    type="text"
                    name="search"
                    placeholder="검색어를 입력해주세요."
                    value={searchWord}
                    onChange={onChangeHandle}
                    autoComplete="off"
                />
                <span type="submit">
                    <SearchIcon fontSize="large" />
                </span>
            </InputBox>

            {filteredList.length === 0 ? (
                <span>검색 결과가 없습니다</span>
            ) : (
                <SearchResult filteredList={filteredList} />
            )}
        </SearchContainer>
    );
}

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
`;

const InputBox = styled.div`
    position: relative;
    margin-bottom: 40px;
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
