import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./createCabinForm";

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

function CabinRow({ cabin }) {
  // console.log(cabin);
  const { id, name, maxCapacity, regularPrice, image, discount } = cabin;

  const [showForm, setShowForm] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteCabins(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries();
    },
    onError: () => toast.error("Cabin could not be deleted."),
  });

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fits upto {maxCapacity} guests</div>
        <Price>{regularPrice}</Price>
        <Discount>{discount}</Discount>
        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>
          <button disabled={isDeleting} onClick={() => mutate(id)}>
            delete
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
