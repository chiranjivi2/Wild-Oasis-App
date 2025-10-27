import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }
  return data;
}

export async function createCabin(newCabin) {
  const { error } = await supabase.from("cabins").insert([newCabin]).select();

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be created.");
  }
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabinss").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
}
