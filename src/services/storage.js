import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

export async function storage_set(key, value) {
  await Storage.set({
    key: key,
    value: JSON.stringify(value)
  });
}

export async function storage_get(key) {
  const item = await Storage.get({ key: key });
  return JSON.parse(item.value);
}

export async function storage_remove(key) {
  await Storage.remove({
    key: key
  });
}
