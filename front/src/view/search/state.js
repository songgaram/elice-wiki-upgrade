import { atom, selector } from "recoil";

export const postList = atom({
    key: "#postList",
    default: [],
});

export const searchKeyword = atom({
    key: "#searchKeyword",
    default: "",
});

export const filteredSearchList = selector({
    key: "#filteredSearchList",
    get: ({ get }) => {
        // 리스트가 들어왔는지 먼저 확인 후 필터
        const list = get(postList);
        const keyword = get(searchKeyword);

        // 키워드가 공백일때 리턴을 해주는 처리 하기
        if (!keyword || !list) return [];
        let filteredResult = list.filter((item) => item.title.includes(keyword));

        return filteredResult;
    },
});
