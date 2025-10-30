import supabase from "./supabase";

export async function getSettings() {
  let { data: settings, error } = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) {
    console.error(
      `error fetching update settings data - chiran ${error.message}`
    );
  }

  return settings;
}

export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .select();

  if (error) {
    console.error(`error updating setting -chiran ${error.message}`);
    throw new Error(error.message);
  }
  return data;
}
