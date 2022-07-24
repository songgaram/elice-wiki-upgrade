import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { searchKeyword } from "./state";

const useDebounce = (value, delay) => {
    const [debounceValue] = useState(value);
    const setSearch = useSetRecoilState(searchKeyword);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(value.trim());
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay, setSearch]);

    return debounceValue;
};

export default useDebounce;
