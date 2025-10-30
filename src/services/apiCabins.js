import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  //https://uuhmrdduhevwrnkajfed.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // console.log(imageName);
  //while editing we have two different situations , case 1: not changing image    case 2: replacing existing cabin image;  to take  into account these two cases we have following logic there
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create Edit Cabin
  let query = supabase.from("cabins");

  //A) Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // const { data, error } = await supabase
  //   .from("cabins")
  //   .insert([{ ...newCabin, image: imagePath }])
  //   .select();

  //B) Edit Cabin

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be created.");
  }
  // const { data, error } = await supabase
  //   .from("cabins")
  //   .update({ other_column: "otherValue" })
  //   .eq("some_column", "someValue")
  //   .select();

  //if there is already image then doesnot reupload the image

  if (hasImagePath) return data;

  //uploading cabin image  const { data, error } = await supabase.storage.from('bucket_name').upload('file_path', file)
  //2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.Delete the cabin if there was error uploading the image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError.message);
    throw new Error(
      "Error Uploading file and also cabin could not be created. chiranjivi"
    );
  }
  return data;
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
}
