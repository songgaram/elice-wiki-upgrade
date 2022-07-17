import { atom } from "recoil";

export const titleAtom = atom({
    key: "title",
    default: "",
});

export const hashtagAtom = atom({
    key: "hashtag",
    default: "",
});

export const tagAtom = atom({
    key: "tag",
    default: [],
});

export const weekAtom = atom({
    key: "week",
    default: "",
});

export const infoAtom = atom({
    key: "info",
    default: "",
});

export const postAtom = atom({
    key: "post",
    default: "",
});

