import styled from "styled-components";
import CabinRow from "./CabinRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  border-radius: 7px;
  font-size: 1.4rem;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  align-items: center;

  column-gap: 2.4rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.4px;
  border-bottom: 1px solid var(--color-grey-200);
  padding: 1.6rem 2.4rem;
  color: var(--color-grey-600);
  background-color: var(--color-grey-50);
`;

function CabinTable({ cabins }) {
  return (
    <Table role="table">
      <TableHeader>
        <div></div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
