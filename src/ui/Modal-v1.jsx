import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
`;

const OverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
`;

const Button = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.2rem;

  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-100);
  }
  & svg {
    height: 2.4rem;
    width: 2.4rem;
  }
  background: none;
`;

function Modal({ children, onClose }) {
  return createPortal(
    <OverLay>
      <StyledModal>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>
        <div>{children}</div>
      </StyledModal>
    </OverLay>,
    document.body
  );
}

export default Modal;
