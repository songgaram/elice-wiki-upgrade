import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";

import Api from "libs/api";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { infoAtom, postAtom } from "atoms";

const TopContainer = styled.div`
    margin-top: 3rem;
    width: 700px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 4rem;
`;

const HeadWrapper = styled.div`
    display: block;
`;

const Title = styled.h1`
    font-size: 3rem;
    line-height: 1.5;
    letter-spacing: -0.004em;
    margin-top: 0px;
    font-weight: 700;
    margin-bottom: 2rem;
    word-break: keep-all;
`;

const Content = styled.div`
    font-size: 1.125rem;
    line-height: 1.7;
    letter-spacing: -0.004em;
    word-break: keep-all;
    overflow-wrap: break-word;
`;

const InfoWrapper = styled.div`
    align-items: center;
    font-size: 1rem;
    color: #495057;
    display: flex;
    justify-content: space-between;
    margin: 50px 0px 50px 0px;
`;

const Information = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: -1.25rem;
`;

const EditedBy = styled.span`
    color: #212529;
    font-weight: bold;
    span {
        color: #7353ea;
    }
`;

const Separator = styled.span`
    margin-left: 0.5rem;
    margin-right: 0.5rem;
`;

const EditedAt = styled.span`
    font-size: 1rem;
    color: #868e96;
`;

const Mdfile = () => {
    let { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useRecoilState(postAtom);
    const [info, setInfo] = useRecoilState(infoAtom);

    const fetchboardsInfo = async () => {
        try {
            const { data } = await Api.get(`post/id/${postId}`);
            setInfo(data.payload);
            // console.log(data.payload);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchboardsInfo();
        import(`_post/${postId}.md`)
            .then((res) => {
                fetch(res.default)
                    .then((res) => res.text())
                    .then((res) => setPost(res))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <TopContainer>
            <HeadWrapper>
                <Title>{info.title}</Title>
                <InfoWrapper>
                    <Information>
                        <EditedBy>
                            last edited by <span>{info.lastmod_user}</span>
                        </EditedBy>
                        <Separator>·</Separator>
                        <EditedAt>{moment(info.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</EditedAt>
                    </Information>
                    <Button variant="contained" onClick={() => navigate("/editPost")}>
                        편집하기
                    </Button>
                </InfoWrapper>
                <Content>
                    <Markdown>{post}</Markdown>
                </Content>
            </HeadWrapper>
        </TopContainer>
    );
};

export default Mdfile;
