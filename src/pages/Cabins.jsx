import { useQuery } from "@tanstack/react-query";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";

import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  const { data: cabins, isPending } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  console.log(cabins);

  if (isPending) return "Loading...";

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/sort</p>
      </Row>

      <Row type="vertical">
        <CabinTable cabins={cabins} />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
