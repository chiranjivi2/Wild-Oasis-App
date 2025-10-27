import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.8rem;
      /* align-items: center; */
    `}

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};
export default Row;
