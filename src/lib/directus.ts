import {
  createDirectus,
  staticToken,
  rest,
  readItems,
  updateItem,
} from "@directus/sdk";

const apiClient = "YQRwVAFUn-LlC_IOPoOkpVLeH75QBlyI"
  ? createDirectus("https://data.zanda.info")
      .with(staticToken("YQRwVAFUn-LlC_IOPoOkpVLeH75QBlyI"))
      .with(rest())
  : undefined;

const calls: any = "Call_Recordings";

export async function getRecordings() {
  try {
    const data = await apiClient?.request(
      readItems(calls, {
        fields: ["id", "Call_Name", "Call_Recording", "DeepGram"],
      })
    );

    return data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export async function transcribe(id: string, data: string) {
  return await apiClient?.request(
    updateItem(calls, id, {
      id: id,
      DeepGram: data,
    })
  );
}
