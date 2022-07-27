import { css } from "styled-components";

const font = css`
    body,
    button,
    input,
    textarea {
        font-family: "Elice Digital Baeum", sans-serif;
        font-feature-settings: "tnum";
        color: #333;
        letter-spacing: -0.05em;
    }

    input {
        font-feature-settings: "tnum";

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            margin: 0;
            appearance: none;
        }
    }
`;

export default font;
