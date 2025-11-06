import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import Pagination from "../../ui/Pagination";
import { useBookings } from "./useBookings";

function BookingTable() {
  const { bookings, count, isPending } = useBookings();
  if (isPending) return <div>Loading...</div>;

  console.log(bookings);

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
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default BookingTable;
