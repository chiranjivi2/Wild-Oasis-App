import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";

function BookingTable() {
  const { data: bookings, isPending } = useQuery({
    queryKey: "bookings",
    queryFn: getBookings,
  });

  if (isPending) return <div>Loading...</div>;

  console.log(bookings);
  console.log(bookings.length);
  //   const arr = [0, 1, 2];
  //   console.log(arr.length);
  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Date</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={bookings}
        render={(booking) => <BookingRow booking={booking} key={booking.id} />}
      />
    </Table>
  );
}

export default BookingTable;
