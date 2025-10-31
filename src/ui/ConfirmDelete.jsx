import Button from "./Button";
import Heading from "./Heading";
import styled from "styled-components";

const StyledConfirmDelete = styled.div`
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & div {
    display: flex;
    gap: 1.2rem;
    justify-content: flex-end;
  }
  & p {
    font-size: 1.4rem;
    line-height: 1.5;
    color: var(--color-grey-500);
  }
`;

function ConfirmDelete({ disabled, onConfirm, resourceName, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure want to delete this {resourceName} permanently? This action
        can not be undone.
      </p>
      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
