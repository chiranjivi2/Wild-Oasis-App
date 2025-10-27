import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 26rem 1.2fr;
  align-items: center;
  column-gap: 2.4rem;
  padding: 1.2rem 0;
  /* align-items: center; */

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;
  }
`;

const Input = styled.input`
  padding: 0.8rem 1.2rem;
  border-radius: 7px;
  border: 1px solid var(--color-grey-300);
  /* justify-self: self-start; */
`;

const Label = styled.label`
  align-self: center;
  font-weight: 500;
`;

const Error = styled.div`
  color: red;
  font-size: 1.4rem;
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
