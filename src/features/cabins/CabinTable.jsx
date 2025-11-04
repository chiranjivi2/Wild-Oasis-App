import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import useCabins from "./useCabins";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, isPending } = useCabins();
  const [searchParam] = useSearchParams();

  const filterValue = searchParam.get("filterValue") || "all";

  if (isPending) return <div>Loading...</div>;
  let filterCabins;
  if (filterValue === "all") filterCabins = cabins;
  if (filterValue === "no-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  // console.log(cabins);
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </Table.Header>
      {/* {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))} */}

      <Table.Body
        data={filterCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
