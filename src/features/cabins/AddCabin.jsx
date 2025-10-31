import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [openModal, setOpenModal] = useState();
  return (
    <>
      <Button onClick={() => setOpenModal((show) => !show)}>
        Add new Cabin
      </Button>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
