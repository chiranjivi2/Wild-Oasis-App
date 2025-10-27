import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }
  return data;
}

export async function createCabin(newCabin) {
  //https://uuhmrdduhevwrnkajfed.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // console.log(imageName);

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create Cabin

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be created.");
  }

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
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
}
