import styled, { css } from "styled-components";

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    border: 1px solid var(--color-grey-200);
    background-color: var(--color-grey-0);
    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
};

const Button = styled.button`
  border-radius: 5px;
  padding: 1rem 1.6rem;
  font-weight: 500;
  border: none;

  ${(props) => variations[props.variation] || variations.primary}
`;

//defaultProps doesnot work in styledComponents v6 but works in v5
// Button.defaultProps = {
//   variation: "primary",
// };

export default Button;
