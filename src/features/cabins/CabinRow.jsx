import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteCabin } from "./useDeleteCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  align-items: center;
  padding: 1.6rem 2.4rem;
  column-gap: 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-weight: 600;
  font-family: "sono";
`;

const Discount = styled.div`
  font-family: "sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function formatCurrency(currency) {
  const currencyInFloat = parseFloat(currency).toFixed(2);
  return `$${currencyInFloat}`;
}

function CabinRow({ cabin }) {
  // console.log(cabin);
  const { id, name, maxCapacity, regularPrice, image, discount, description } =
    cabin;

  const { isCreating, createCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      image,
      discount,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fits upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          {/* // for disaplaying as modal window */}
          <Modal>
            <Modal.Open opens="edit">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Open opens="confirmDelete">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="confirmDelete">
              <ConfirmDelete
                disabled={isDeleting}
                onConfirm={() => deleteCabin(id)}
                resourceName="cabin"
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
    </>
  );
}

export default CabinRow;
