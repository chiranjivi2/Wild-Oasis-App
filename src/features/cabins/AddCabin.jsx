import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );

  // const [openModal, setOpenModal] = useState();
  // return (
  //   <>
  //     <Button onClick={() => setOpenModal((show) => !show)}>
  //       Add new Cabin
  //     </Button>
  //     {openModal && (
  //       <Modal onClose={() => setOpenModal(false)}>
  //         <CreateCabinForm onCloseModal={() => setOpenModal(false)} />
  //       </Modal>
  //     )}
  //   </>
  // );
}

export default AddCabin;
