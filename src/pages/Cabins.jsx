import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";

import AddCabin from "../features/cabins/AddCabin";
import Filter from "../ui/Filter";

function Cabins() {
  // const { data: cabins, isPending } = useQuery({
  //   queryKey: ["cabins"],
  //   queryFn: getCabins,
  // });
  // console.log(cabins);

  // if (isPending) return "Loading...";

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <Filter />
      </Row>

      <Row type="vertical">
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
