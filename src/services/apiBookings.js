import supabase from "./supabase";

export async function getBookings() {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded.");
  }
  return bookings;
}
